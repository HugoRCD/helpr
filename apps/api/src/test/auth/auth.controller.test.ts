import { AuthController } from "../../auth/auth.controller";
import { UserService } from "../../user/user.service";
import { AuthService } from "../../auth/auth.service";
describe("AuthController", () => {
  let authController: AuthController;
  let userService: UserService;
  let authService: AuthService;

  beforeAll(async () => {
    userService = new UserService(null, null, null);
    authService = new AuthService(null, null, null, null);
    authController = new AuthController(userService, authService);
  });

  describe("register", () => {
    let mySpy: jest.SpyInstance;
    let res: any;
    beforeAll(async () => {
      mySpy = jest.spyOn(userService, "create").mockImplementation(() => {
        return "user" as any;
      });
      res = await authController.register(null);
    });
    it("should return 'user'", () => {
      expect(res).toStrictEqual("user");
    });
    it("Should be call once", () => {
      expect(mySpy).toBeCalledTimes(1);
    });
  });

  describe("login", () => {
    let validateUserSpy: jest.SpyInstance;
    let createAccessTokenSpy: jest.SpyInstance;
    let createRefreshTokenSpy: jest.SpyInstance;
    let createSessionSpy: jest.SpyInstance;
    let validateUserRes: any;
    let createAccessTokenRes: any;
    let createRefreshTokenRes: any;
    let createSessionRes: any;
    beforeAll(async () => {
      validateUserSpy = jest
        .spyOn(authService, "validateUser")
        .mockImplementation(() => {
          return "User validated" as any;
        });
      createAccessTokenSpy = jest
        .spyOn(authService, "createAccessToken")
        .mockImplementation(() => {
          return "Access token created" as any;
        });
      createRefreshTokenSpy = jest
        .spyOn(authService, "createRefreshToken")
        .mockImplementation(() => {
          return "Refresh token created" as any;
        });
      createSessionSpy = jest
        .spyOn(userService, "createSession")
        .mockImplementation(
          (validateRes: any, atRes: any, rtRes: any, response: any) => {
            return { validateRes, atRes, rtRes, response } as any;
          },
        );
      validateUserRes = await authService.validateUser(null, null);
      createAccessTokenRes = await authService.createAccessToken(null);
      createRefreshTokenRes = await authService.createRefreshToken(null);
      createSessionRes = await userService.createSession(
        validateUserRes,
        createAccessTokenRes,
        createRefreshTokenRes,
        "response" as any,
      );
    });
    it("should return 'User validated'", () => {
      expect(validateUserRes).toStrictEqual("User validated");
    });
    it("should call validateUser once", () => {
      expect(validateUserSpy).toBeCalledTimes(1);
    });
    it("should return 'Access token created'", () => {
      expect(createAccessTokenRes).toStrictEqual("Access token created");
    });
    it("should call createAccessToken once", () => {
      expect(createAccessTokenSpy).toBeCalledTimes(1);
    });
    it("should return 'Refresh token created'", () => {
      expect(createRefreshTokenRes).toStrictEqual("Refresh token created");
    });
    it("should call createRefreshToken once", () => {
      expect(createRefreshTokenSpy).toBeCalledTimes(1);
    });
    it("should return a user object with user, authToken, resetToken and response", () => {
      expect(createSessionRes).toStrictEqual({
        validateRes: "User validated",
        atRes: "Access token created",
        rtRes: "Refresh token created",
        response: "response",
      });
    });
    it("should call createSession once", () => {
      expect(createSessionSpy).toBeCalledTimes(1);
    });
  });

  describe("logout", () => {
    let deleteTokenSpy: jest.SpyInstance;
    let deleteTokenRes: any;
    beforeAll(async () => {
      deleteTokenSpy = jest
        .spyOn(userService, "deleteTokens")
        .mockImplementation(() => {
          return "Token deleted" as any;
        });
      deleteTokenRes = await userService.deleteTokens(null, null);
    });

    it("should return 'Token deleted'", () => {
      expect(deleteTokenRes).toStrictEqual("Token deleted");
    });
    it("should call deleteTokens once", () => {
      expect(deleteTokenSpy).toBeCalledTimes(1);
    });
  });

  describe("refresh", () => {
    let refreshTokenSpy: jest.SpyInstance;
    let refreshTokenRes: any;
    beforeAll(async () => {
      refreshTokenSpy = jest
        .spyOn(authService, "refreshToken")
        .mockImplementation(() => {
          return "Token refreshed" as any;
        });
      refreshTokenRes = await authService.refreshToken(null);
    });

    it("should return 'token refreshed'", () => {
      expect(refreshTokenRes).toStrictEqual("Token refreshed");
    });

    it("should call refreshToken once", () => {
      expect(refreshTokenSpy).toBeCalledTimes(1);
    });
  });
});
