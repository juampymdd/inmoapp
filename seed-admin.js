require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaLibSQL } = require("@prisma/adapter-libsql");
const { createClient } = require("@libsql/client");
const bcrypt = require("bcryptjs");

const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});
const adapter = new PrismaLibSQL(libsql);
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
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
