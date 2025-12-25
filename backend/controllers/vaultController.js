const Vault = require('../models/Vault');

// 1. Create Vault
exports.createVault = async (req, res) => {
  console.log("🔸 CREATE REQUEST RECEIVED");
  // console.log("🔸 User Info:", req.user); // Debugging ke liye hata sakte ho baad mein

  try {
    // 1. User ID nikalna
    const userId = req.user ? (req.user.id || req.user._id) : null;

    if (!userId) {
        throw new Error("User ID not found in token. Please Logout & Login again.");
    }

    const { title, content, maxViews, expiresAfterMinutes, passcode } = req.body;

    // 2. Validation
    if (!title || !content || !maxViews || !expiresAfterMinutes) {
        throw new Error("Missing required fields (title, content, views, or expiry).");
    }

    // 3. Expiry Time Set Karna
    const expiresAt = new Date(Date.now() + expiresAfterMinutes * 60000);

    // 4. Object Banana (FIXED: 'user' changed to 'owner')
    const newVault = new Vault({
      owner: userId, // <--- YE HAI MAIN FIX (Database 'owner' maang raha tha)
      title,
      content,
      maxViews: Number(maxViews),
      viewsLeft: Number(maxViews),
      passcode: passcode || '',
      expiresAt
    });

    // 5. Save karna
    await newVault.save();
    console.log("✅ Success! Vault Created.");
    res.json(newVault);

  } catch (err) {
    console.error("🔴 CREATION ERROR:", err);
    res.status(500).json({ 
        message: err.message || "Unknown Server Error" 
    });
  }
};

// 2. Get My Vaults
exports.getMyVaults = async (req, res) => {
  try {
    const userId = req.user ? (req.user.id || req.user._id) : null;
    if(!userId) return res.status(400).json({message: "User not identified"});

    // FIXED: Yahan bhi 'owner' se dhoondna padega
    const vaults = await Vault.find({ owner: userId }).sort({ createdAt: -1 });
    res.json(vaults);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 3. Access/View Vault
exports.accessVault = async (req, res) => {
  try {
    const vaultId = req.params.id.trim();
    const { passcode } = req.body;

    const vault = await Vault.findById(vaultId);

    // 1. Check agar vault exist karta hai
    if (!vault) {
      return res.status(404).json({ message: "Secret Not Found (Link expired or invalid)" });
    }

    // 2. Check Expiry Time
    if (new Date() > new Date(vault.expiresAt)) {
        await Vault.findByIdAndDelete(vaultId);
        return res.status(404).json({ message: "This secret has expired by time." });
    }

    // 3. Check View Limit
    if (vault.viewsLeft <= 0) {
        await Vault.findByIdAndDelete(vaultId);
        return res.status(404).json({ message: "View limit reached. Secret destroyed." });
    }

    // 4. Check Passcode (Agar laga hua hai)
    if (vault.passcode && vault.passcode !== passcode) {
      return res.status(401).json({ message: "Incorrect Passcode" });
    }

    // 5. Update Views
    vault.viewsLeft = vault.viewsLeft - 1;
    await vault.save();

    res.json(vault);

  } catch (err) {
    console.error("Access Error:", err);
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ message: "Invalid Link Format" });
    }
    res.status(500).json({ message: err.message });
  }
};