## Format
```bash
<type>(<scope>): <subject>

<body>

<footer>
```

## Allowed **type** values
+   **feat** : new feature for the user, not a new feature for build script
+   **fix** : bug fix for the user, not a fix to a build script
+   **docs** : changes to the documentation
+   **style** : formatting, missing semi colons, etc; no production code change
+   **refactor** : refactoring production code, eg. renaming a variable
+   **test** : adding missing tests, refactoring tests; no production code change
+   **chore** : updating grunt tasks etc; no production code change

## Allowed **scope** values
+   init
+   runner
+   watcher
+   config
+   web-server
+   proxy
+   etc.

## Suggestions for **body**
+   uses the imperative, present tense: “change” not “changed” nor “changes”
+   includes motivation for the change and contrasts with previous behavior

## Suggestions for **footer**

### Referencing issues
+   Closed issues should be listed on a separate line in the footer prefixed with "Closes" keyword like this:
```bash
Closes #234
```

+   or in the case of multiple issues:
```bash
Closes #123, #245, #992
```