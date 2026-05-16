db = db.getSiblingDB("db_todoapp");

db.createUser({
  user: "app_backend",
  pwd: "app_backend_password",
  roles: [
    {
      role: "dbOwner",
      db: "db_todoapp",
    },
    {
      role: "createIndex",
      db: "db_todoapp",
    },
  ],
});

db.createUser({
  user: "admin_app",
  pwd: "admin_app_password",
  roles: [
    {
      role: "dbAdmin",
      db: "db_todoapp",
    },
    {
      role: "userAdmin",
      db: "db_todoapp",
    },
  ],
});

db.getSiblingDB("admin").createUser({
  user: "backup_user",
  pwd: "backup_user_password",
  roles: [
    {
      role: "readAnyDatabase",
      db: "admin",
    },
  ],
});
