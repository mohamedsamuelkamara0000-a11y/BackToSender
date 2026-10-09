document.addEventListener("DOMContentLoaded", () => {
    const UNIVERSAL_LIMIT = 357.00;
    const FEE_PERCENTAGE = 0.15;

    const amountInput = document.getElementById("amount");
    const feeDisplay = document.getElementById("feeDisplay");
    const payoutDisplay = document.getElementById("payoutDisplay");
    const conversionForm = document.getElementById("conversionForm");
    const errorModal = document.getElementById("errorModal");
    const errorText = document.getElementById("errorText");
    const networkOptions = document.querySelectorAll(".network-option");

    // 1. Handle Visual Carrier Selection Toggles
    networkOptions.forEach(option => {
        option.addEventListener("click", function() {
            networkOptions.forEach(opt => opt.classList.remove("selected"));
            this.classList.add("selected");
            const radio = this.querySelector(".radio-input");
            if (radio) radio.checked = true;
        });
    });

    // 2. Real-time Calculation Processing Engine
    amountInput.addEventListener("input", (e) => {
        const amount = parseFloat(e.target.value) || 0;

        // Dismiss security warnings if fixed inline
        if (amount <= UNIVERSAL_LIMIT) {
            errorModal.classList.add("hidden");
        }

        const calculatedFee = amount * FEE_PERCENTAGE;
        const calculatedPayout = amount - calculatedFee;

        feeDisplay.innerText = `Le ${calculatedFee.toFixed(2)}`;
        payoutDisplay.innerText = `Le ${calculatedPayout.toFixed(2)}`;
    });

    // 3. Form Dispatch Enforcement Rules
    conversionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const amount = parseFloat(amountInput.value) || 0;

        if (amount > UNIVERSAL_LIMIT) {
            errorText.innerText = `To secure systemic liquidity, back2sender enforces a strict cap of Le ${UNIVERSAL_LIMIT} daily for all accounts. Please lower your payout request.`;
            errorModal.classList.remove("hidden");
            
            // Auto-hide warning alert card after 6 seconds
            setTimeout(() => {
                errorModal.classList.add("hidden");
            }, 6000);
            return;
        }

        alert(`🎉 Success! Conversion for Le ${amount.toFixed(2)} requested. An automated mobile network balance deduction verification OTP has been triggered.`);
    });
});
