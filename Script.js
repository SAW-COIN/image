// استخدام Supabase مع import
const TELEGRAM_BOT_TOKEN = "7540338527:AAH4A_gOp_FTR3jRdtNa-QcfCCLRMIN0FDo";
const ADMIN_TELEGRAM_ID = 6793556284;

const paymentSection = document.getElementById("paymentSection");
const usernameElement = document.getElementById("username");
const balanceElement = document.getElementById("balance");
const statusElement = document.getElementById("participationStatus");
const progressBar = document.getElementById("progress");
const progressText = document.getElementById("participantCount");

// إنشاء عنصر الإشعار
const notification = document.createElement("div");
notification.className = "notification";
document.body.appendChild(notification);

// دالة عرض الإشعار
function showNotification(message, type = "error") {
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.className = "notification"; // إعادة الإشعار للوضع الافتراضي
    }, 3000);
}

// مساعد لتنسيق اسم المستخدم
function formatUsername(username) {
    const maxLength = 5;
    return username.length > maxLength ? username.slice(0, maxLength) + "..." : username;
}

// مساعد لتنسيق الرصيد
function formatBalance(balance) {
    if (balance >= 1_000_000_000_000) {
        return (balance / 1_000_000_000_000).toFixed(2) + "T";
    } else if (balance >= 1_000_000_000) {
        return (balance / 1_000_000_000).toFixed(2) + "B";
    } else if (balance >= 1_000_000) {
        return (balance / 1_000_000).toFixed(2) + "M";
    } else if (balance >= 1_000) {
        return (balance / 1_000).toFixed(2) + "K";
    }
    return balance.toString();
}

async function loginUser(telegramId) {
    const email = `${telegramId}@SawToken.coin`;
    const password = `password_${telegramId}`;

    try {
        // محاولة تسجيل الدخول
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        // إذا لم يكن المستخدم موجودًا في المصادقة
        if (loginError) {
            console.log("User not found in auth system. Creating a new account.");

            // تسجيل مستخدم جديد في المصادقة
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) {
                throw new Error(`Failed to register user: ${signUpError.message}`);
            }

            console.log("New user created successfully:", signUpData.user.id);
            return { telegramId, email };
        }

        console.log("User logged in successfully:", loginData.user);
        return { telegramId, email };
    } catch (error) {
        console.error("Error logging in or registering user:", error.message);
        throw error;
    }
}

async function addUserToDatabase(telegramId, email) {
    try {
        // التحقق من وجود المستخدم في جدول `users`
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("telegram_id", telegramId)
            .maybeSingle();

        if (userError) {
            throw new Error(`Error fetching user data: ${userError.message}`);
        }

        // إذا لم يكن المستخدم موجودًا في الجدول
        if (!userData) {
            console.log("No user data found in database. Adding user.");
            const { error: insertError } = await supabase
                .from("users")
                .insert({
                    telegram_id: telegramId,
                    email,
                    is_participating: false,
                    vip_status: false,
                });

            if (insertError) {
                throw new Error(`Failed to insert user data: ${insertError.message}`);
            }
        }
    } catch (error) {
        console.error("Error adding user to database:", error.message);
        throw error;
    }
}

async function fetchUserDataFromTelegram() {
    try {
        const telegramApp = window.Telegram.WebApp;
        telegramApp.ready();

        const userTelegramId = telegramApp.initDataUnsafe.user?.id;
        if (!userTelegramId) {
            throw new Error("Telegram user ID is missing");
        }

        const userTelegramName = telegramApp.initDataUnsafe.user?.username || `user_${userTelegramId}`;
        usernameElement.textContent = formatUsername(userTelegramName);

        // إنشاء البريد الإلكتروني بناءً على Telegram ID
        const email = `${userTelegramId}@SawToken.coin`;

        // تسجيل الدخول أو التسجيل
        const authUser = await loginUser(userTelegramId);

        // التأكد من إدخال المستخدم في جدول `users`
        await addUserToDatabase(userTelegramId, email);

        await fetchUserBalance(userTelegramId);
        await updateProgressBar();
    } catch (error) {
        console.error("Error fetching Telegram data:", error.message);
        showNotification(error.message || "Failed to fetch Telegram data", "error");
    }
}

// Update user status based on participation
async function fetchUserBalance(userTelegramId) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("balance, is_participating, vip_status")
            .eq("telegram_id", userTelegramId)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        if (data) {
            // Update balance
            balanceElement.textContent = formatBalance(data.balance);

            // Update participation status
            const statusTextElement = document.getElementById("Statustxtprogress");

            if (data.vip_status) {
                statusElement.textContent = "VIP Participant";
                statusElement.style.backgroundImage =
                    "linear-gradient(to right, #FFD700, #8A2BE2)"; // VIP gradient
                statusElement.style.color = "transparent"; // Hide color to apply gradient
                statusElement.style.backgroundClip = "text";

                statusTextElement.textContent =
                    "You're ahead of 80% of all participants! Get ready to win big!";
               // statusTextElement.style.color = "#FFD700";

                paymentSection.style.display = "none";
                document.getElementById("vipSection").style.display = "none";
            } else if (data.is_participating) {
                statusElement.textContent = "Regular Participant";
                statusElement.style.color = "#2D83EC";

                statusTextElement.textContent =
                    "You're ahead of 50% of participants! Keep going, your victory is within reach!";
                //statusTextElement.style.color = "#2D83EC";

                paymentSection.style.display = "none";
            } else {
                statusElement.textContent = "Not Participated";
                statusElement.style.color = "red";

                statusTextElement.textContent =
                    "You have no chances to win! Join now and seize your opportunity!";
               // statusTextElement.style.color = "red";

                paymentSection.style.display = "block";
            }
        } else {
            balanceElement.textContent = "0";
            showNotification("No balance found for this user.", "error");
        }
    } catch (error) {
        console.error("Error fetching user balance:", error);
        balanceElement.textContent = "Error";
        showNotification("Failed to fetch user balance.", "error");
    }
}


// تحديث شريط التقدم مع عدد افتراضي
async function updateProgressBar() {
    try {
        // استعلام لجمع المشاركين العاديين
        const { data: regularParticipants, error: regularError } = await supabase
            .from("users")
            .select("*")
            .eq("is_participating", true);

        if (regularError) throw new Error(regularError.message);

        // استعلام لجمع المشاركين الـ VIP
        const { data: vipParticipants, error: vipError } = await supabase
            .from("users")
            .select("*")
            .eq("vip_status", true);

        if (vipError) throw new Error(vipError.message);

        // العدد الافتراضي
        const defaultParticipants = 1050;

        // حساب العدد الإجمالي
        const totalParticipants = 
            regularParticipants.length + 
            (vipParticipants.length * 5) + // كل VIP = 5 أشخاص
            defaultParticipants;

        // الحد الأقصى (8000)
        const maxParticipants = 8000;

        // حساب النسبة المئوية
        const progressPercentage = Math.min((totalParticipants / maxParticipants) * 100, 100);

        // تحديث النص
        progressText.textContent = `${totalParticipants} Participants`;

        // تحديث عرض شريط التقدم
        progressBar.style.width = `${progressPercentage}%`;

        // إشعار عند اكتمال العدد
        if (totalParticipants >= maxParticipants) {
            showNotification("The minimum participants have been reached!", "success");
        }
    } catch (error) {
        console.error("Error updating progress bar:", error);
        showNotification("Failed to update progress bar.", "error");
    }
}

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './Scripts/config.js';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// تعديل دالة إشعار الأدمن لتضمين عنوان المحفظة
async function notifyAdminForRegular(userId, username) {
    const wallet = getWalletAddress(); // جلب عنوان المحفظة
    const message = `🟢 New Regular Participation:
👤 ID : ${userId}
📛 Username : @${username || "N/A"}
💼 Wallet : https://tonviewer.com/${wallet}`;

    await sendTelegramNotification(message);
}

async function notifyAdminForVIP(userId, username, amount) {
    const wallet = getWalletAddress(); // جلب عنوان المحفظة
    const message = `🌟 New VIP Subscription:
👤 ID : ${userId}
📛 Username : @${username || "N/A"}
💼 Wallet : https://tonviewer.com/${wallet}
💰 Paid : ${amount} TON`;

    await sendTelegramNotification(message);
}

// دالة عامة لإرسال الإشعار إلى تليجرام
async function sendTelegramNotification(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: ADMIN_TELEGRAM_ID,
        text: message,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!result.ok) {
            console.error("Telegram API Error:", result.description);
            showNotification("Failed to notify admin: " + result.description, "error");
        } else {
            console.log("Admin notified successfully:", result);
        }
    } catch (error) {
        console.error("Error notifying admin:", error.message);
        showNotification("Error notifying admin: " + error.message, "error");
    }
}


// تعديل دالة تسجيل المشاركة
async function registerParticipation() {
    const telegramApp = window.Telegram.WebApp;
    const telegramId = telegramApp.initDataUnsafe.user?.id;
    const username = telegramApp.initDataUnsafe.user?.username || `user_${telegramId}`;

    try {
        const { data, error } = await supabase
            .from("users")
            .update({ is_participating: true })
            .eq("telegram_id", telegramId);

        if (error) throw new Error(error.message);

        // تحديث الحالة
        statusElement.textContent = "Regular Participant";
        statusElement.style.color = "#2D83EC";

        // تحديث شريط التقدم
        await updateProgressBar();

        await notifyAdminForRegular(telegramId, username, walletAddress);
      
        showNotification("Participation confirmed successfully!", "success");
    } catch (error) {
        console.error("Error updating participation:", error);
        showNotification("Failed to register participation.", "error");
    }
}

window.Telegram.WebApp.setHeaderColor('#101010');
document.addEventListener("DOMContentLoaded", fetchUserDataFromTelegram);

// إعداد TonConnect
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://sawcoin.vercel.app/json/tonconnect-manifest.json',
    buttonRootId: 'ton-connect'
});


let walletAddress = null; // متغير عام لتخزين عنوان المحفظة

async function connectToWallet() {
    try {
        const isConnected = tonConnectUI.wallet !== null;
        if (isConnected) {
            showNotification("Wallet is already connected.", "info");
            return;
        }

        const connectedWallet = await tonConnectUI.connectWallet();
        walletAddress = connectedWallet.account.address;

        // تخزين عنوان المحفظة في التخزين المحلي
        localStorage.setItem("walletAddress", walletAddress);

        showNotification("Wallet connected successfully!", "success");
        console.log("Wallet Address:", walletAddress);
    } catch (error) {
        console.error("Error connecting to wallet:", error.message);
        showNotification("Failed to connect wallet: " + error.message, "error");
    }
}

// جلب عنوان المحفظة من التخزين المحلي
function getWalletAddress() {
    return localStorage.getItem("walletAddress") || "Not Connected";
}


tonConnectUI.uiOptions = {
    twaReturnUrl: 'https://t.me/SAWCOIN_BOT/GAME'
};

async function makePayment() {
    try {
        const requiredAmount = '500000000'; 
        const walletAddress = 'UQBOBIEGLWuaMNLBy3HTaYU-F-3Py8q7o0kGw7S_2vLxRmqr';

        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 600, // صالح لمدة 10 دقائق
            messages: [
                {
                    address: walletAddress,
                    amount: requiredAmount,
                },
            ],
        };

        await tonConnectUI.sendTransaction(transaction);
        showNotification('The operation was completed successfully', 'success');
        await registerParticipation();
    } catch (error) {
        console.error('Error making payment:', error);
        showNotification(`Payment failed: ${error.message}`, 'error');
    }
}

// ربط الأزرار بالأحداث
document.getElementById("ton-connect").addEventListener("click", connectToWallet);
document.getElementById("payNow").addEventListener("click", makePayment);



// عرض مستويات VIP في الواجهة
function renderVIPLevels() {
    const vipLevels = [
        { id: 1, name: "VIP Silver", price: 5, features: "Basic perks and increased chances." },
        { id: 2, name: "VIP Gold", price: 20, features: "Enhanced perks and increased chances." },
        { id: 3, name: "VIP Platinum", price: 40, features: "Premium perks and maximum chances." },
    ];

    const vipSection = document.getElementById("vipSection");

    // إضافة النصوص العامة التي تظهر مرة واحدة فقط
    vipSection.innerHTML = `
        <p id="Statustxtvip"> Get more chances to win </p>
        <p id="Statustxtprogressvip"> VIP subscriptions allow you to increase your chances of winning the weekly lottery </p>
    `;

    // إضافة مستويات VIP
    vipSection.innerHTML += vipLevels.map(level => `
        <div class="vip-level">
            <h3>${level.name}</h3>
            <p class="vip-Price"> Price : ${level.price} TON</p>
            <button onclick="subscribeVIP(${level.price})">Subscribe</button>
            <p class="vip-features">Features: ${level.features}</p>
        </div>
    `).join("");
}


window.subscribeVIP = async function (price) {
    const telegramApp = window.Telegram.WebApp;
    const telegramId = telegramApp.initDataUnsafe.user?.id;
    const username = telegramApp.initDataUnsafe.user?.username || `user_${telegramId}`;

    try {
        // الدفع عبر المحفظة
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [
                {
                    address: "UQBOBIEGLWuaMNLBy3HTaYU-F-3Py8q7o0kGw7S_2vLxRmqr",
                    amount: (price * 1_000_000_000).toString(), 
                },
            ],
        };

        await tonConnectUI.sendTransaction(transaction);

        // تحديث حالة VIP في قاعدة البيانات
        const { error } = await supabase
            .from("users")
            .update({ vip_status: true })
            .eq("telegram_id", telegramId);

        if (error) throw new Error(error.message);

        // إخطار الأدمن بحالة VIP مع المبلغ المدفوع
        await notifyAdminForVIP(telegramId, username, walletAddress, price);
    
        showNotification("VIP subscription successful!", "success");
    } catch (error) {
        console.error("Error subscribing to VIP:", error);
        showNotification(`VIP subscription failed: ${error.message}`, "error");
    }
};


// عرض مستويات VIP عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", renderVIPLevels);
