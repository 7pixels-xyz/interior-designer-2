(async () => {
    const pages = ['/contact', '/about', '/projects', '/services'];
    const results = await Promise.all(
        pages.map(async p => {
            try {
                const res = await fetch('http://localhost:3000' + p);
                return `${p}: ${res.status}`;
            } catch (e) {
                return `${p}: ERROR ${e.message}`;
            }
        })
    );
    console.log(results.join('\n'));
})();
