const app = require("./src/app");
const connect = require("./src/db/db");
const dotenv = require("dotenv");
// Load environment variables from the .env file
dotenv.config({ path: "./.env" });
const seedAdmin = require("./src/scripts/seedAdmin"); // Import the seedAdmin function


// Connect to the database
connect();

// Seed the admin user

// Seed Admin (asynchronously)
const runSeedAdmin = async () => {
    try {
        await seedAdmin();
        console.log("Seed Admin completed.");
    } catch (error) {
        console.log("Error seeding admin:", error.message);
    }
};
runSeedAdmin();

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});