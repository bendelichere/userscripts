# userscripts
## multi-site userscripts toolbox

- JENKINS LIB: click heaven !
  - clicking the **Realms** cell toggles ALL the checkboxes 
  - clicking a row toggles all the checkboxes in that row
  - clicking a column toggles all the checkboxes in that column
  - clicking a cell toggles all the checkboxes in that cell
  - bonus feature 1: removed useless labels
  - bonus feature 2: version selector and build button are now at the top of the page

- JIRA LIB:
  - replace durations in the comments title by the real datetime (we don't want to know that a comment was posted 5 days ago, we want the exact date and time)

- SFCC LIB:
  - dropdown list of sites in alphabetical order 
  - Manage Sites : added "Open All" links
  - Manage Sites : added direct links to Settings & Cache
  - Site Exports : added "Click all" and "Click all brands" links

## install instructions

### install Tampermonkey:
- go to https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
- click the **Add to Chrome** button

### install scripts in Tampermonkey:
- copy one of the scripts to install
  - JENKINS LIB : https://raw.githubusercontent.com/bendelichere/userscripts/main/jenkinslib.js
  - JIRA LIB https://raw.githubusercontent.com/bendelichere/userscripts/main/jiralib.js
  - SFCC LIB https://raw.githubusercontent.com/bendelichere/userscripts/main/sfcclib.js
  - ADYEN LIB https://raw.githubusercontent.com/bendelichere/userscripts/main/adyenlib.js
- click Chrome's extension button (right of URL bar, puzzle piece shaped icon 🧩)
- click the **Tampermonkey** label (not the 3 dots)
- click the **Dashboard** label (it will open a new browser tab)
- click on the **Utilities** tab
- paste the copied URL in **Import from URL**
- click **Install** button
- click **Install** button (yes, the other one)
- voilà ! (goto Jenkins, Jira, or SFCC and enjoy)
