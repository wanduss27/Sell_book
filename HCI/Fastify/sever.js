// Import Fastify
const fastify = require("fastify")({ logger: true });

const mongoose = require("mongoose");

// Kết nối với MongoDB
mongoose
  .connect("mongodb://localhost/ban-sach", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Đã kết nối với MongoDB"))
  .catch((err) => console.log("Lỗi khi kết nối", err));

// Tạo route cơ bản
fastify.get("/", async (request, reply) => {
  return { message: "Chào mừng đến với cửa hàng sách" };
});

const Sach = require("../models/sach"); // Import model Sach

// Tạo route POST để thêm sách
fastify.post("/sach", async (request, reply) => {
  try {
    const sachMoi = new Sach(request.body); // Tạo đối tượng sách mới từ dữ liệu được gửi lên
    await sachMoi.save(); // Lưu sách mới vào cơ sở dữ liệu
    reply.send(sachMoi); // Trả về sách mới được thêm
  } catch (err) {
    reply.status(500).send({ error: "Không thể thêm sách" });
  }
});

// Chạy server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server chạy ở địa chỉ ${address}`);
});

///npm install fastify-cors ===> cai dat cors tránh lỗi khi gọi api từ client khác domain

const fastifyCors = require("fastify-cors");

fastify.register(fastifyCors);
