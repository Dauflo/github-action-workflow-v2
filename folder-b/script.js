const fs = require('fs')

const toBuild = JSON.parse('[".github/workflows/ci.yaml","folder-a/README.md","folder-b/.version","folder-b/Dockerfile","folder-b/README.md",""]').filter((file) => {
    if (file.includes('.version') && fs.existsSync(`${file.split('/')[0]}/Dockerfile`)) {
        return file
    }
})

let output = ''

if (toBuild.length === 0) {
    console.log('#### No version file updated')
} else {
    output = `#### Version files updated

    <details><summary>Show directories</summary>

    \`\`\`\n
    ${toBuild.map(element => {
        const version = fs.readFileSync(element, 'utf-8')
        const folder = element.split('/')[0]
        return `${folder} version ${version}`
    })}
    \`\`\`
    </details>
    *Pusher: @${{ github.actor }}, Action: \`${{ github.event_name }}\`*`
}

github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: output
})