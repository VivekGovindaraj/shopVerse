import dns from "node:dns";

dns.setServers(["8.8.8.8"]);

dns.resolveSrv(
  "_mongodb._tcp.vivek.ufvcep1.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
)