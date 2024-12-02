const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route for login
server.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get("users").value();

  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    res.status(200).json({ token: "mock-jwt-token" });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// Custom route for registration
server.post("/auth/register", (req, res) => {
  const { fullName, email, username, password } = req.body;
  const users = router.db.get("users").value();

  if (users.some((u) => u.username === username || u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    fullName,
    email,
    username,
    password
  };

  router.db.get("users").push(newUser).write();
  res.status(201).json({ message: "User registered successfully" });
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
