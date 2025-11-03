
const posts = [
    {
        id: 1,
        title: "AI Revolution in Medical Imaging: Beyond the Human Eye",
        author: "Dr. Sarah Lee",
        excerpt:
            "Artificial Intelligence is now capable of detecting subtle patterns in radiology scans that even expert doctors might miss. With machine learning algorithms trained on millions of images, hospitals are reducing misdiagnosis rates, speeding up results, and enhancing patient care. Yet, ethical challenges and data privacy remain at the heart of this digital revolution.",
        banner: "https://picsum.photos/seed/medai1/800/500",
        avatar: "https://picsum.photos/seed/author1/100/100",
    },
    {
        id: 2,
        title: "Genetic Engineering and the Promise of Personalized Medicine",
        author: "Dr. Amelia Chen",
        excerpt:
            "The rise of CRISPR and genome editing tools has opened the door to tailor-made treatments. By understanding a patient’s unique DNA structure, doctors can design therapies with higher success rates and fewer side effects. However, bioethical concerns about genetic manipulation still spark heated debates in scientific and political circles.",
        banner: "https://picsum.photos/seed/genetics2/800/500",
        avatar: "https://picsum.photos/seed/author2/100/100",
    },
    {
        id: 3,
        title: "Nanotechnology in Cancer Treatment: The Next Frontier",
        author: "Prof. Daniel Brooks",
        excerpt:
            "Nanoparticles are now being used to deliver chemotherapy directly to cancer cells, minimizing damage to healthy tissue. This targeted approach marks a major shift in oncology, combining physics, chemistry, and medicine. Researchers are optimistic about how nanotech can improve survival rates in the next decade.",
        banner: "https://picsum.photos/seed/nano3/800/500",
        avatar: "https://picsum.photos/seed/author3/100/100",
    },
    {
        id: 4,
        title: "The Role of Robotics in Modern Surgery",
        author: "Dr. Linda Park",
        excerpt:
            "Surgical robots are redefining precision in the operating room. They allow for smaller incisions, faster recovery, and reduced pain for patients. Surgeons now rely on robotic-assisted systems to perform complex operations that were once impossible by hand, while maintaining full control and oversight.",
        banner: "https://picsum.photos/seed/robotics4/800/500",
        avatar: "https://picsum.photos/seed/author4/100/100",
    },
    {
        id: 5,
        title: "The Science of Sleep: How Rest Impacts Brain Health",
        author: "Dr. Nathan Ortiz",
        excerpt:
            "Sleep is not just rest—it’s a critical biological process that cleans the brain, consolidates memory, and regulates emotion. Neuroscientists are uncovering how chronic sleep deprivation leads to cognitive decline and increased risk of neurodegenerative diseases such as Alzheimer’s.",
        banner: "https://picsum.photos/seed/sleep5/800/500",
        avatar: "https://picsum.photos/seed/author5/100/100",
    },
];


for (let i = 6; i <= 50; i++) {
    posts.push({
        id: i,
        title: `Scientific Insights #${i}: Exploring the Future of Healthcare`,
        author: `Dr. Researcher ${i}`,
        excerpt:
            "From artificial organs to precision diagnostics, science is pushing the boundaries of human longevity. Each new discovery reveals not only the potential to heal but also the responsibility to use knowledge wisely. In this ongoing revolution, collaboration between AI engineers, biologists, and physicians is shaping the medicine of tomorrow.",
        banner: `https://picsum.photos/seed/post${i}/800/500`,
        avatar: `https://picsum.photos/seed/avatar${i}/100/100`,
    });
}

export default posts;
