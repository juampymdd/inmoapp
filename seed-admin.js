require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        console.log("Creating admin user...");
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = await prisma.user.upsert({
            where: { email: "admin@inmoapp.com" },
            update: {},
            create: {
                email: "admin@inmoapp.com",
                name: "Admin InmoApp",
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        console.log("✅ Admin user created successfully!");
        console.log("Email:", admin.email);
        console.log("Role:", admin.role);
    } catch (error) {
        console.error("❌ Error:", error.message);
        throw error;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
