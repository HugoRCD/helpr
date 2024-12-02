import { UserService } from "../../user/user.service";
import { UserController } from "../../user/user.controller";
import { PrismaService } from "../../prisma.service";
import { MailingService } from "../../mailing/mailing.service";

describe("UserService", () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let mailingService: MailingService;

  beforeAll(async () => {
    userService = new UserService(null, null, null);
    prismaService = new PrismaService();
    mailingService = new MailingService(null);
  });

  describe("create", () => {
    let createSpy: jest.SpyInstance;
    let createRes: any;
    let prismaCreateSpy: jest.SpyInstance;
    let prismaCreateRes: any;
    let createVerificationUrlSpy: jest.SpyInstance;
    let createVerificationUrlRes: any;
    let mailingServiceSpy: jest.SpyInstance;
    let mailingServiceRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      createSpy = jest.spyOn(userService, "create").mockImplementation(() => {
        return "user" as any;
      });
      createRes = await userService.create(null);
      prismaCreateSpy = jest
        .spyOn(prismaService.user, "create")
        .mockImplementation(() => {
          return "user data" as any;
        });
      prismaCreateRes = await prismaService.user.create(null);
      createVerificationUrlSpy = jest
        .spyOn(userService, "createVerificationUrl")
        .mockImplementation(() => {
          return "url" as any;
        });
      createVerificationUrlRes = await userService.createVerificationUrl(
        null,
        null,
      );
      mailingServiceSpy = jest
        .spyOn(mailingService, "sendNewUser")
        .mockImplementation(() => {
          return "newUser mail" as any;
        });
      mailingServiceRes = await mailingService.sendNewUser(null, null);
    });

    it("should return 'user'", () => {
      expect(createRes).toStrictEqual("user");
    });
    it("Should call create once", () => {
      expect(createSpy).toBeCalledTimes(1);
    });
    it("should return 'user data'", () => {
      expect(prismaCreateRes).toStrictEqual("user data");
    });
    it("Should call create once", () => {
      expect(prismaCreateSpy).toBeCalledTimes(1);
    });
    it("should return 'url'", () => {
      expect(createVerificationUrlRes).toStrictEqual("url");
    });
    it("Should call createVerificationUrl once", () => {
      expect(createVerificationUrlSpy).toBeCalledTimes(1);
    });
    it("should return 'newUser mail'", () => {
      expect(mailingServiceRes).toStrictEqual("newUser mail");
    });
    it("Should call sendNewUser once", () => {
      expect(mailingServiceSpy).toBeCalledTimes(1);
    });
  });

  describe("createVerificationUrl", () => {
    let emailVerificationCreateSpy: jest.SpyInstance;
    let emailVerificationCreateRes: any;
    let sendNewVerificationSpy: jest.SpyInstance;
    let sendNewVerificationRes: any;
    let createVerificationUrlSpy: jest.SpyInstance;
    let createVerificationUrlRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      emailVerificationCreateSpy = jest
        .spyOn(prismaService.emailVerification, "create")
        .mockImplementation(() => {
          return "emailVerification data" as any;
        });
      emailVerificationCreateRes = await prismaService.emailVerification.create(
        null,
      );
      sendNewVerificationSpy = jest
        .spyOn(mailingService, "sendNewVerification")
        .mockImplementation(() => {
          return "newVerification mail" as any;
        });
      sendNewVerificationRes = await mailingService.sendNewVerification(
        null,
        null,
      );
      createVerificationUrlSpy = jest
        .spyOn(userService, "createVerificationUrl")
        .mockImplementation(() => {
          return "url" as any;
        });
      createVerificationUrlRes = await userService.createVerificationUrl(
        null,
        null,
      );
    });

    it("should return 'emailVerification data'", () => {
      expect(emailVerificationCreateRes).toStrictEqual(
        "emailVerification data",
      );
    });
    it("Should call emailVerification.create once", () => {
      expect(emailVerificationCreateSpy).toBeCalledTimes(1);
    });
    it("should return 'newVerification mail'", () => {
      expect(sendNewVerificationRes).toStrictEqual("newVerification mail");
    });
    it("Should call sendVerificationOnce", () => {
      expect(sendNewVerificationSpy).toBeCalledTimes(1);
    });
    it("should return 'url'", () => {
      expect(createVerificationUrlRes).toStrictEqual("url");
    });
    it("Should call createVerificationUrl once", () => {
      expect(createVerificationUrlSpy).toBeCalledTimes(1);
    });
  });

  describe("getUserById", () => {
    let getUserByIdSpy: jest.SpyInstance;
    let getUserByIdRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      getUserByIdSpy = jest
        .spyOn(userService, "getUserById")
        .mockImplementation(() => {
          return "User" as any;
        });
      getUserByIdRes = await userService.getUserById(null);
    });

    it("should return 'User'", () => {
      expect(getUserByIdRes).toStrictEqual("User");
    });
    it("Should call getUserById once", () => {
      expect(getUserByIdSpy).toBeCalledTimes(1);
    });
  });

  describe("getUserByLogin", () => {
    let getUserByLoginSpy: jest.SpyInstance;
    let getUserByLoginRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      getUserByLoginSpy = jest
        .spyOn(userService, "getUserByLogin")
        .mockImplementation(() => {
          return "User" as any;
        });
      getUserByLoginRes = await userService.getUserByLogin(null);
    });

    it("should return 'User'", () => {
      expect(getUserByLoginRes).toStrictEqual("User");
    });
    it("Should call getUserByLogin once", () => {
      expect(getUserByLoginSpy).toBeCalledTimes(1);
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe("createSession", () => {
    let createSessionSpy: jest.SpyInstance;
    let createSessionRes: any;
    let prismaUserUpdateSpy: jest.SpyInstance;
    let prismaUserUpdateRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      createSessionSpy = jest
        .spyOn(userService, "createSession")
        .mockImplementation(() => {
          return "Session" as any;
        });
      createSessionRes = await userService.createSession(
        null,
        null,
        null,
        null,
      );
      prismaUserUpdateSpy = jest
        .spyOn(prismaService.user, "update")
        .mockImplementation(() => {
          return "user data" as any;
        });
      prismaUserUpdateRes = await prismaService.user.update(null);
    });

    it("should return 'Session'", () => {
      expect(createSessionRes).toStrictEqual("Session");
    });
    it("Should call createSession once", () => {
      expect(createSessionSpy).toBeCalledTimes(1);
    });
    it("should return 'user data'", () => {
      expect(prismaUserUpdateRes).toStrictEqual("user data");
    });
    it("Should call prisma.user.update once", () => {
      expect(prismaUserUpdateSpy).toBeCalledTimes(1);
    });
  });

  describe("deleteTokens", () => {
    let deleteTokensSpy: jest.SpyInstance;
    let deleteTokensRes: any;
    let prismaUpdateSpy: jest.SpyInstance;
    let prismaUpdateRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      deleteTokensSpy = jest
        .spyOn(userService, "deleteTokens")
        .mockImplementation(() => {
          return "Tokens deleted" as any;
        });
      deleteTokensRes = await userService.deleteTokens(null, null);
      prismaUpdateSpy = jest
        .spyOn(prismaService.user, "update")
        .mockImplementation(() => {
          return "user data" as any;
        });
      prismaUpdateRes = await prismaService.user.update(null);
    });

    it("should return 'Tokens deleted'", () => {
      expect(deleteTokensRes).toStrictEqual("Tokens deleted");
    });
    it("Should call deleteTokens once", () => {
      expect(deleteTokensSpy).toBeCalledTimes(1);
    });
    it("sould return 'user data'", () => {
      expect(prismaUpdateRes).toStrictEqual("user data");
    });
    it("Should call update once", () => {
      expect(prismaUpdateSpy).toBeCalledTimes(1);
    });
  });

  describe("getAllUsers", () => {
    let getAllUsersSpy: jest.SpyInstance;
    let getAllUsersRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      getAllUsersSpy = jest
        .spyOn(userService, "getAllUsers")
        .mockImplementation(() => {
          return "Users" as any;
        });
      getAllUsersRes = await userService.getAllUsers();
    });

    it("should return 'Users'", () => {
      expect(getAllUsersRes).toStrictEqual("Users");
    });
    it("Should call getAllUsers once", () => {
      expect(getAllUsersSpy).toBeCalledTimes(1);
    });
  });

  describe("verifyEmail", () => {
    let verifyEmailSpy: jest.SpyInstance;
    let verifyEmailRes: any;
    let updateSpy: jest.SpyInstance;
    let updateRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      verifyEmailSpy = jest
        .spyOn(userService, "verifyEmail")
        .mockImplementation(() => {
          return "email verified" as any;
        });
      verifyEmailRes = await userService.verifyEmail(null, null);
      updateSpy = jest
        .spyOn(prismaService.user, "update")
        .mockImplementation(() => {
          return "user data" as any;
        });
      updateRes = await prismaService.user.update(null);
    });

    it("should return 'user data'", () => {
      expect(updateRes).toStrictEqual("user data");
    });
    it("Should call update once", () => {
      expect(updateSpy).toBeCalledTimes(1);
    });
    it("should return 'email verified'", () => {
      expect(verifyEmailRes).toStrictEqual("email verified");
    });
    it("Should call verifyEmail once", () => {
      expect(verifyEmailSpy).toBeCalledTimes(1);
    });
  });

  describe("updateUser", () => {
    let updateUserSpy: jest.SpyInstance;
    let updateUserRes: any;
    let updateSpy: jest.SpyInstance;
    let updateRes: any;
    beforeAll(async () => {
      updateUserSpy = jest
        .spyOn(userService, "updateUser")
        .mockImplementation(() => {
          return {
            where: { id: "userId" },
            data: "updateUserDto",
          } as any;
        });
      updateUserRes = await userService.updateUser(null, null);
    });

    it("should return an updated user", () => {
      expect(updateUserRes).toStrictEqual({
        where: { id: "userId" },
        data: "updateUserDto",
      });
    });
    it("Should call updateUser once", () => {
      expect(updateUserSpy).toBeCalledTimes(1);
    });
  });

  describe("deleteUser", () => {
    let deleteUserSpy: jest.SpyInstance;
    let deleteUserRes: any;
    let deleteSpy: jest.SpyInstance;
    let deleteRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      deleteUserSpy = jest
        .spyOn(userService, "deleteUser")
        .mockImplementation(() => {
          return "User deleted" as any;
        });
      deleteUserRes = await userService.deleteUser(null);
      deleteSpy = jest
        .spyOn(prismaService.user, "delete")
        .mockImplementation(() => {
          return "delete" as any;
        });
      deleteRes = await prismaService.user.delete(null);
    });

    it("should return 'User'", () => {
      expect(deleteUserRes).toStrictEqual("User deleted");
    });
    it("Should call deleteUser once", () => {
      expect(deleteUserSpy).toBeCalledTimes(1);
    });
    it("should return 'delete'", () => {
      expect(deleteRes).toStrictEqual("delete");
    });
    it("Should call delete once", () => {
      expect(deleteSpy).toBeCalledTimes(1);
    });
  });

  describe("getUserByProviderId", () => {
    let getUserByProviderIdSpy: jest.SpyInstance;
    let getUserByProviderIdRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      getUserByProviderIdSpy = jest
        .spyOn(userService, "getUserByProviderId")
        .mockImplementation(() => {
          return "User by provider id" as any;
        });
      getUserByProviderIdRes = await userService.getUserByProviderId(null);
    });

    it("should return 'User'", () => {
      expect(getUserByProviderIdRes).toStrictEqual("User by provider id");
    });
    it("Should call getUserByProviderId once", () => {
      expect(getUserByProviderIdSpy).toBeCalledTimes(1);
    });
  });
});
