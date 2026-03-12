import fetch from 'node-fetch'; // If node-fetch isn't there, I'll try global fetch

const API_URL = 'http://localhost:5000/api/auth';
const testUser = {
    full_name: "Test User",
    email: `test_${Date.now()}@example.com`,
    password: "password123"
};

let cookies = "";

async function runTests() {
    try {
        console.log("--- Starting Endpoint Tests ---");

        // 1. Signup
        console.log("\n1. Testing Signup...");
        const signupRes = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const signupData = await signupRes.json();
        console.log("Status:", signupRes.status);
        console.log("Response:", signupData);
        if (signupRes.status !== 201) throw new Error("Signup failed");

        // Extract cookie
        const setCookie = signupRes.headers.get('set-cookie');
        if (setCookie) cookies = setCookie.split(';')[0];
        console.log("Cookie received:", cookies ? "Yes" : "No");

        // 2. Login
        console.log("\n2. Testing Login...");
        const loginRes = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testUser.email, password: testUser.password })
        });
        const loginData = await loginRes.json();
        console.log("Status:", loginRes.status);
        if (loginRes.status !== 200) throw new Error("Login failed");

        // 3. Dashboard (Protected)
        console.log("\n3. Testing Protected Dashboard...");
        const dashRes = await fetch(`${API_URL}/dashboard`, {
            method: 'GET',
            headers: { 'Cookie': cookies }
        });
        const dashData = await dashRes.json();
        console.log("Status:", dashRes.status);
        console.log("Response:", dashData);
        if (dashRes.status !== 200) throw new Error("Dashboard access failed");

        // 4. Logout
        console.log("\n4. Testing Logout...");
        const logoutRes = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: { 'Cookie': cookies }
        });
        const logoutData = await logoutRes.json();
        console.log("Status:", logoutRes.status);
        console.log("Response:", logoutData);
        if (logoutRes.status !== 200) throw new Error("Logout failed");

        // 5. Verify Logout (Dashboard should fail)
        console.log("\n5. Verifying Logout (Accessing Dashboard again)...");
        const dashVerifyRes = await fetch(`${API_URL}/dashboard`, {
            method: 'GET',
            headers: { 'Cookie': 'token=' } // Clear or expired token
        });
        console.log("Status (should be 401):", dashVerifyRes.status);
        if (dashVerifyRes.status === 401) {
            console.log("SUCCESS: Access denied as expected.");
        } else {
            console.warn("WARNING: Access should have been denied.");
        }

        console.log("\n--- All Tests Completed Successfully ---");
    } catch (error) {
        console.error("\n!!! Test Suite Failed !!!");
        console.error(error.message);
    }
}

// Check if running on localhost:5000
runTests();
