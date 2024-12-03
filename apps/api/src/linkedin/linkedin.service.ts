import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ProviderCredentials } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { ProviderService } from '../provider/provider.service'

@Injectable()
export class LinkedinService {

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private providerService: ProviderService,
  ) {}
  async postOnLinkedIn(userId: number, linkedin_post_content: string) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      'linkedin',
      true,
    )
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'LinkedIn-Version': '202211',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Type': 'application/json',
      }
      // Get user ID and cache it.
      const apiResp = await fetch('https://api.linkedin.com/v2/me', {
        headers: headers,
      })
      const profile = await apiResp.json()

      const params = {
        author: `urn:li:person:${profile.id}`,
        commentary: linkedin_post_content,
        visibility: 'PUBLIC',
        lifecycleState: 'PUBLISHED',
        distribution: {
          feedDistribution: 'MAIN_FEED',
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
      }

      await fetch('https://api.linkedin.com/rest/posts', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params),
      })
    } catch (error) {
      throw new BadRequestException('invalid_credentials')
    }
    return {
      message: 'post-created',
    }
  }

  async createCredentials(
    userId: number,
    accessToken: string,
  ): Promise<ProviderCredentials> {
    const user = await this.userService.getUserById(userId)
    if (!user) throw new BadRequestException('user_not_found')

    try {
      const response = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const data = await response.json()
      console.log(data)

      return await this.providerService.addCredentials(
        user.id,
        data.id,
        'linkedin',
        accessToken,
      )
    } catch (error) {
      throw new BadRequestException('invalid_credentials')
    }
  }

}
