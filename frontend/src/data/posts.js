function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




const posts = [];


for (let i = 1; i <= 50; i++) {
    let randomBanner = getRandomInt(1, 3);
    let randomAvatar = getRandomInt(1, 7);
    posts.push({
        id: i,
        title: `Scientific Insights #${i}: Exploring the Future of Healthcare`,
        author: `Dr. Researcher ${i}`,
        excerpt:
            "From artificial organs to precision diagnostics, science is pushing the boundaries of human longevity. Each new discovery reveals not only the potential to heal but also the responsibility to use knowledge wisely. In this ongoing revolution, collaboration between AI engineers, biologists, and physicians is shaping the medicine of tomorrow.",
        banner: `../../public/assets/banner${randomBanner}.jpg`,
        avatar: `../../public/assets/profile${randomAvatar}.jpg`,
    });
}

export default posts;
