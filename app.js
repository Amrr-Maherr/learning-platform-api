require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { main } = require("./config/db");
const coursesRoutes = require("./routes/courses.routes");
const usersRoutes = require("./routes/users.routes");
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/courses", coursesRoutes);
app.use("/api/v1/users", usersRoutes);
main()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(console.error);
