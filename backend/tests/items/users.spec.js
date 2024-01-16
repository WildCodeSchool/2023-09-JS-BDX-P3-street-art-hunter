const { app, request, database } = require("../setup");

describe("GET api/users", () => {
  it("should get all user successfully", async () => {
    const response = await request(app).get(`/api/users`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("POST api/users", () => {
  it("should create an user successfully", async () => {
    const user = {
      username: "test",
      email: "mail@mail.com",
      postcode: "33000",
      city: "Bordeaux",
      password: "trtrtr",
      points: 0,
      isAdmin: 0,
    };
    const response = await request(app).post("/api/users").send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body.insertId).toBeGreaterThan(0);

    const [result] = await database.query("SELECT * FROM users WHERE id = ?", [
      response.body.insertId,
    ]);
    const [userFromDatabase] = result;

    expect(userFromDatabase.username).toBe(user.username);
    expect(userFromDatabase.email).toBe(user.email);
    expect(userFromDatabase.postcode).toBe(user.postcode);
    expect(userFromDatabase.city).toBe(user.city);
    expect(userFromDatabase.password).not.toBe(user.password);
  });
  it("should return an error if the user already exists", async () => {
    const userWithMissingProps = { username: "Lila" };
    const response = await request(app)
      .post("/api/users")
      .send(userWithMissingProps);
    expect(response.statusCode).toBe(500);
  });
});

describe("PUT api/users/:id", () => {
  it("should update an user successfully", async () => {
    const newUser = {
      username: "test",
      email: "test@mail.com",
      postcode: "33000",
      city: "Bordeaux",
      password: "trtrtr",
    };

    const [result] = await database.query(
      "INSERT INTO users(username, email, postcode, city, password) VALUES (?, ?, ?, ?, ?)",
      [
        newUser.username,
        newUser.email,
        newUser.postcode,
        newUser.city,
        newUser.password,
      ]
    );

    const id = result.insertId;

    const updatedUser = {
      username: "teste",
      email: "test@mail.com",
      postcode: "33000",
      city: "Bordeaux",
      password: "trtrtr",
    };

    const response = await request(app)
      .put(`/api/users/${id}`)
      .send(updatedUser);
    expect(response.statusCode).toBe(200);

    const [resulte] = await database.query(
      "SELECT * FROM users WHERE id=?",
      id
    );
    const [userInDatabase] = resulte;
    expect(userInDatabase).toHaveProperty("id");
    expect(userInDatabase).toHaveProperty("username");
    expect(userInDatabase).toHaveProperty("email");
    expect(userInDatabase).toHaveProperty("postcode");
    expect(userInDatabase).toHaveProperty("city");
    expect(userInDatabase).toHaveProperty("password");
    expect(userInDatabase.username).toStrictEqual(updatedUser.username);
    expect(userInDatabase.email).toStrictEqual(updatedUser.email);
    expect(userInDatabase.postcode).toStrictEqual(updatedUser.postcode);
    expect(userInDatabase.city).toStrictEqual(updatedUser.city);
    expect(userInDatabase.password).not.toStrictEqual(updatedUser.password);
  });

  it("should return an error", async () => {
    const userWithMissingProps = { username: "Lila" };
    const response = await request(app)
      .put(`/api/users/14`)
      .send(userWithMissingProps);
    expect(response.statusCode).toBe(500);
  });

  it("should return no user", async () => {
    const newUser = {
      username: "zzzzz",
      email: "lez@mail.com",
      postcode: "33000",
      city: "Bordeaux",
      password: "azerty",
    };
    const response = await request(app).put("/api/users/0").send(newUser);
    expect(response.statusCode).toBe(404);
  });
});
