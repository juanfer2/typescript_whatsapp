const HEADER_NAME = 'authorization';

export const context = async ({ req }: any) => {
  const authToken = req.headers[HEADER_NAME];
  
  try {
    const currentUser = {
      id: 1,
      username: "jhon2",
      password: "asdqwe123",
      name: "jhon2"
    }
    return {
      currentUser
    }
  } catch (e) {
    console.warn(`Unable to authenticate using auth token: ${authToken}`);
  }
}
