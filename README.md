# CDK Template TypeScript

Custom template for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Create Repository from Template by GitHub UI

1. Follow this guide:
   [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)

1. On the second step select our template: `cdk-template-typescript`

## Update Template Information

Update `package.json` file with the new repository name, description and add
yourself as new contributor.

```json
{
  "name": "[repository-name]",
  "description": "[repository-description]",
  "repository": "ddias-dev/[repository-name]",
  "contributors": [
    {
      "name": "Diego Dias",
      "email": "ddias.dev@gmail.com"
    },
    {
      "name": "[developer-name]",
      "email": "[developer-email]"
    }
  ],
  "bugs": "https://github.com/ddias-dev/[repository-name]/issues",
  "homepage": "https://github.com/ddias-dev/[repository-name]#readme"
}
```

## Template Custom Features

- Package management with [Yarn 2](https://yarnpkg.com)
- Automated version management with
  [Semantic Release](https://semantic-release.gitbook.io)
- Code format with [Prettier](https://prettier.io/)
- Git hooks with [Husky](https://typicode.github.io/husky)
- Lint code with [ESLint](https://eslint.org/)
- Lint commit messages with [commitlint](https://commitlint.js.org)
- Lint staged files with [lint-staged](https://github.com/okonet/lint-staged)

## Template Useful Commands

- `yarn install` install packages
- `yarn upgrade-interactive` easy way to update outdated packages
- `yarn format` formats all files supported by Prettier in the current directory
  and its subdirectories
- `yarn build` compile typescript to js
- `yarn watch` watch for changes and compile
- `yarn test` perform the jest unit tests
- `yarn clean` clean up yarn caches, remove node_modules and yarn.lock

## CDK Useful Commands

- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Semantic Commit Messages

See how a minor change to your commit message style can make you a better
programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is the Jira issue identifier

### Commit Message Format

```text
feat(PLAT-1): Add hat wobble
^--^ ^----^  ^------------^
|    |       |
|    |       +---> Summary in present tense and must be sentence-case.
|    |
|    +-----------> Jira issue identifier.
|
+----------------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

References:

- <https://www.conventionalcommits.org/>
- <https://seesparkbox.com/foundry/semantic_commit_messages>
- <http://karma-runner.github.io/1.0/dev/git-commit-msg.html>

## Continuous Integration and Continuous Delivery (CI/CD)

Using GitHub Actions that is a continuous integration and continuous delivery
(CI/CD) platform that allows you to automate your build, test, and deployment
pipeline. You can create workflows that build and test every pull request to
your repository, or deploy merged pull requests to production.

The workflows are divide by:

- `deploy-[env]`: deploy the infrastructure to a specific environment.

- `release`: is a semantic release that analyzer commits and might generate a
  release notes and new version based on semantics commits.

- `test`: is triggered by pull requests, to run the testing before merge to
  main.

## Visual Studio Code extensions

To enhance the development experience is recommend install those vs-code
extensions:

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) -
  Spelling checker for source code
- [Commit Message Editor](https://marketplace.visualstudio.com/items?itemName=adam-bender.commit-message-editor) -
  Edit commit messages in a convenient way.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) -
  Integrates ESLint JavaScript into VS Code.
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) -
  Supercharge Git within VS Code.
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) -
  Markdown linting and style checking for Visual Studio Code.
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) -
  Code formatter using prettier.
