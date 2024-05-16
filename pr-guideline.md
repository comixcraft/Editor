# How to create a PR

## Before creating the PR

- **Merge Dev on your branch**
- Remove the console.logs that you didn't removed yet
- Review your code to be sure that you remove all what is unnecessary
- Deploy your code on netlify
- Be sure that you commited and pushed your last changes 
- Test your code as explained here [Test](/test-procedure-guideline.md) 
 
***Great! You are ready to create your PR !!***

## Create the PR

- Go to the github of editor: https://github.com/comixcraft/Editor
- If you did everything correctly, you should see something like that:
<img src="https://docs.github.com/assets/cb-34106/mw-1440/images/help/pull_requests/pull-request-compare-pull-request.webp" alt="Yellow banner image" width="500" height="auto">
- Click on Compare & pull request
- You should see that at the top: (if not, you should merge dev into your branch and resolve the conflicts)

- Add a description
  - With the main news that your PR is bringing
  - The big bugs you encountered meanwhile coding and how to reproduce them (to be sure that you solve them)
  - Points that you are not sure you did as you should
  - Points that you want the reviewer to pay special attention on
  - The link of your deployed version
- *Optional* Choose one or more reviewers by clicking on Assignees => the best would be to have someone that is not using the same OS as you
- Add a label
- Click on Create Pull Request
- Write on the discord Channel that you create a new PR, Tag the Assignees if you entered some

***Great! You created your PR !!***

## When the reviewer ask for changes

- go on github
- read the comments of the reviewer
  - be open for feedback => no one wants to bother you
  - keep a critical eye => You know want you did, sometimes the feedback/opinion of the reviewer won't work on your specific code
- Do the changes if needed
- Commit and push again
- Check that dev is still merge on your branch (no new accepted PR in between)
- Ask for a new review (up right on the PR screen)

## When the PR is accepted

Go to the discord Channel and write a message @everyone and give a list of files that you changed.

If there are specific points that were bringing bugs, mentions them too, so that everyone can have a small look on these points.

***Congratulation!! Your PR is now merged and closed!!***
