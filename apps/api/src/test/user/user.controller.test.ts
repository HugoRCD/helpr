import { UserService } from "../../user/user.service";
import { UserController } from "../../user/user.controller";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  beforeAll(async () => {
    userService = new UserService(null, null, null);
    userController = new UserController(userService);
  });

  describe("getAllUsers", () => {
    let getAllUsersSpy: jest.SpyInstance;
    let getAllUsersRes: any;
    beforeAll(async () => {
      getAllUsersSpy = jest
        .spyOn(userService, "getAllUsers")
        .mockImplementation(() => {
          return "Users" as any;
        });
      getAllUsersRes = await userController.getAllUsers();
    });

    it("should return 'Users'", () => {
      expect(getAllUsersRes).toStrictEqual("Users");
    });
    it("Should call getAllUsers once", () => {
      expect(getAllUsersSpy).toBeCalledTimes(1);
    });
  });

  describe("getCurentUser", () => {
    let getUserByIdSpy: jest.SpyInstance;
    let getUserByIdRes: any;
    beforeAll(async () => {
      getUserByIdSpy = jest
        .spyOn(userService, "getUserById")
        .mockImplementation(() => {
          return "User" as any;
        });
      getUserByIdRes = await userController.getUserById(null);
    });

    it("should return 'User'", () => {
      expect(getUserByIdRes).toStrictEqual("User");
    });
    it("Should call getUserById once", () => {
      expect(getUserByIdSpy).toBeCalledTimes(1);
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
      getUserByIdRes = await userController.getUserById(null);
    });

    it("should return 'User'", () => {
      expect(getUserByIdRes).toStrictEqual("User");
    });
    it("Should call getUserById once", () => {
      expect(getUserByIdSpy).toBeCalledTimes(1);
    });
  });

  describe("createUser", () => {
    let createUserSpy: jest.SpyInstance;
    let createUserRes: any;
    beforeAll(async () => {
      jest.clearAllMocks();
      createUserSpy = jest
        .spyOn(userService, "getUserById")
        .mockImplementation(() => {
          return "User" as any;
        });
      createUserRes = await userController.getUserById(null);
    });

    it("should return 'User'", () => {
      expect(createUserRes).toStrictEqual("User");
    });
    it("Should call getUserById once", () => {
      expect(createUserSpy).toBeCalledTimes(1);
    });
  });

  describe("sendNewToken", () => {
    let createVerificationUrlSpy: jest.SpyInstance;
    let createVerificationUrlRes: any;
    beforeAll(async () => {
      createVerificationUrlSpy = jest
        .spyOn(userService, "createVerificationUrl")
        .mockImplementation(() => {
          return "Verification url" as any;
        });
      createVerificationUrlRes = await userService.createVerificationUrl(
        null,
        null,
      );
    });

    it("should return 'Verification url'", () => {
      expect(createVerificationUrlRes).toStrictEqual("Verification url");
    });
    it("Should call createVerificationUrl once", () => {
      expect(createVerificationUrlSpy).toBeCalledTimes(1);
    });
  });

  describe("verifyUser", () => {
    let verifyEmailSpy: jest.SpyInstance;
    let verifyEmailRes: any;

    beforeAll(async () => {
      verifyEmailSpy = jest
        .spyOn(userService, "verifyEmail")
        .mockImplementation(() => {
          return "Verification email" as any;
        });
      verifyEmailRes = await userService.verifyEmail(null, null);
    });

    it("should return 'Verification email'", () => {
      expect(verifyEmailRes).toStrictEqual("Verification email");
    });
    it("Should call verifyEmail once", () => {
      expect(verifyEmailSpy).toBeCalledTimes(1);
    });
  });

  describe("updateUser", () => {
    let updateUserSpy: jest.SpyInstance;
    let updateUserRes: any;

    beforeAll(async () => {
      updateUserSpy = jest
        .spyOn(userService, "updateUser")
        .mockImplementation(() => {
          return "Updated user" as any;
        });
      updateUserRes = await userService.updateUser(null, null);
    });

    it("should return 'Updated user'", () => {
      expect(updateUserRes).toStrictEqual("Updated user");
    });
    it("Should call updateUser once", () => {
      expect(updateUserSpy).toBeCalledTimes(1);
    });
  });

  describe("deleteUser", () => {
    let deleteUserSpy: jest.SpyInstance;
    let deleteUserRes: any;

    beforeAll(async () => {
      deleteUserSpy = jest
        .spyOn(userService, "deleteUser")
        .mockImplementation(() => {
          return "Deleted user" as any;
        });
      deleteUserRes = await userService.deleteUser(null);
    });

    it("should return 'Deleted user'", () => {
      expect(deleteUserRes).toStrictEqual("Deleted user");
    });
    it("Should call deleteUser once", () => {
      expect(deleteUserSpy).toBeCalledTimes(1);
    });
  });
});
