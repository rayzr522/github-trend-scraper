const { get } = require('snekfetch');
const { load } = require('cheerio');

async function main() {
    const res = await get('https://github.com/explore?since=daily');

    const $ = load(res.body.toString());

    $('#explore-trending>div>ul>li>div').each(function () {
        const tag = $('a', $(this)).text().trim();
        const description = $('p', $(this)).text().trim().replace(/\n/g, '');

        console.log({ tag, description });
    });
}

async function run() {
    try {
        await main();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

run();