const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\HP\\Downloads\\Landing Website\\Landing Website';
const htmlFiles = fs.readdirSync(sourceDir).filter(f => f.startsWith('blog-'));

const blogs = [];

function extractText(html, regex) {
    const match = html.match(regex);
    return match ? match[1].trim() : '';
}

for (const file of htmlFiles) {
    const slug = file.replace('blog-', '').replace('.html', '');
    const htmlContent = fs.readFileSync(path.join(sourceDir, file), 'utf8');

    // Extract Title
    const titleMatch = htmlContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract Category (The span before h1 containing the SVG)
    let category = '';
    const catMatch = htmlContent.match(/<span[^>]*bg-primary-900[^>]*>[\s\S]*?<\/svg>\s*([\s\S]*?)<\/span>/i);
    if (catMatch) category = catMatch[1].trim();

    // Extract Date
    let date = '';
    const dateMatches = [...htmlContent.matchAll(/<span[^>]*gap-2[^>]*>[\s\S]*?<\/svg>\s*([^<]+)<\/span>/gi)];
    if (dateMatches.length >= 1) {
        date = dateMatches[0][1].trim();
    }

    // Extract Read Time
    let readTime = '';
    if (dateMatches.length >= 2) {
        readTime = dateMatches[1][1].trim();
    }

    // Extract Image
    const imgMatch = htmlContent.match(/<img src="([^"]+)" alt="[^"]*" class="w-full h-full object-cover"/i);
    const imageUrl = imgMatch ? imgMatch[1] : '';

    // Extract Content Body
    const contentMatch = htmlContent.match(/<div class="prose max-w-none text-dark-800 leading-relaxed">([\s\S]*?)<\/div>\s*<!--\s*Bottom Divider/i);
    let content = contentMatch ? contentMatch[1].trim() : '';

    // Process Content to change class to className etc.
    content = content
        .replace(/class=/g, 'className=')
        .replace(/<br>/g, '<br />')
        .replace(/<hr>/g, '<hr />')
        .replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />')
        .replace(/<input([^>]+?)(?<!\/)>/g, '<input$1 />');

    blogs.push({
        slug,
        category,
        title,
        date,
        readTime,
        imageUrl,
        content
    });
}

const targetFile = path.join('src', 'data', 'blogs.ts');
const targetDir = path.dirname(targetFile);
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

let fileContent = `export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content: string;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(blogs, null, 2)};
`;

fs.writeFileSync(targetFile, fileContent, 'utf8');
console.log(`Generated ${targetFile}`);
