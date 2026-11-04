const contactData = {
    name: "Andrew Yungk",
    company: "Yungk Technologies",
    role: "Full Stack Developer",
    phone: "2102609483",
    email: "yungktechnologies@gmail.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
};

// 3D Flip Mechanics Axis Animation Trigger Control
function flipCard(event) {
    if (event) event.preventDefault();
    const flipper = document.getElementById('cardFlipper');
    flipper.classList.toggle('flipped');
}

// Global VCard Compilation logic for Contacts Hub Integration
function saveContact(event) {
    if (event) event.stopPropagation();
    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${contactData.name}`,
        `ORG:${contactData.company}`,
        `TITLE:${contactData.role}`,
        `TEL;TYPE=CELL:${contactData.phone}`,
        `EMAIL;TYPE=PREF,INTERNET:${contactData.email}`,
        `URL;TYPE=WORK:${contactData.linkedin}`,
        `URL;TYPE=PORTFOLIO:${contactData.github}`,
        "END:VCARD"
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${contactData.name.replace(/\s+/g, '_')}_Contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function shareCard() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: contactData.company,
                text: `Connect with ${contactData.name}`,
                url: window.location.href
            });
        } catch (err) {}
    } else {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        } catch (err) {}
    }
}
