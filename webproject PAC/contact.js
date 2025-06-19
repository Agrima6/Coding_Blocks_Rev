const contactData = {
    header: {
      logo: "logo.png",
      nav: [
        { label: "Home", href: "index.html" },
        { label: "About Us", href: "AboutUs.html" },
        { label: "Gallery", href: "gallery.html" },
        { label: "Events", href: "event1.html" },
        { label: "Contact", href: "contact.html" }
      ]
    },
    main: {
      title: "Contact Us",
      intro: "Reach out to PAC for any inquiries or information. We're here to help and connect with fellow photography enthusiasts.",
      contactInfo: {
        heading: "Get in Touch",
        subheading: "We'd love to hear from you! Please fill out the form below to reach us.",
        email: "contact@pacphotoclub.com",
        phone: "+1 (555) 123-4567"
      },
      form: {
        inputs: [
          { type: "text", placeholder: "Name", required: true },
          { type: "email", placeholder: "Email", required: true },
          { type: "textarea", placeholder: "Message", rows: 4, required: true }
        ],
        buttonText: "Submit"
      }
    },
    footer: {
      logo: "logo.png",
      socialIcons: [
        { platform: "Facebook", href: "#", icon: "fab fa-facebook-f" },
        { platform: "Instagram", href: "#", icon: "fab fa-instagram" },
        { platform: "Twitter", href: "#", icon: "fab fa-twitter" },
        { platform: "YouTube", href: "#", icon: "fab fa-youtube" }
      ],
      copyright: "&copy; 2024 PAC Photography Club. All rights reserved.",
      termsLinks: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" }
      ]
    }
  };
  
  // Example of accessing the object data
  console.log(contactData.main.title); // "Contact Us"
  console.log(contactData.footer.socialIcons[0].platform); // "Facebook"
  