# task-app

A simple react application that renders a list of tasks categorized
into three lanes: `To Do`, `In Progress`, and `Completed`.

Built using [react hooks](https://reactjs.org/docs/hooks-intro.html),
[styled-components](https://styled-components.com/),
and the [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) library.

![task-app](https://user-images.githubusercontent.com/10861443/99208463-4fe50c80-2775-11eb-8cb9-e68f8eb5a43a.gif)

## Installation

You will need [node](https://nodejs.org/en/download/) and
[yarn](https://classic.yarnpkg.com/en/docs/install/) installed.

### Clone repo

```
# clone the repo
git clone https://github.com/CBMasri/task-app.git

# go into app's directory
cd task-app

# install dependencies
yarn install
```

### Scripts

```
# serve with hot reload at localhost:3000
yarn start

# build for production with minification
yarn build

# launch the test runner
yarn test
```

## Application Usage

Each lane represents a task state. When a task is first created, it will appear
under the `To Do` lane. Tasks can be moved between lanes using the mouse or via
[keyboard commands](#accessibility). Task data will be saved in your local browser
storage.

| Action           |                                                                                  |
|------------------|----------------------------------------------------------------------------------|
| Create a task    | Enter the task in the input box (`Enter` to confirm)                             |
| Edit a task      | Click the text of the task you wish to edit (`Enter` to confirm, `Esc` to abort) |
| Remove a task    | Click the red `X` which appears when you hover over a task                       |
| Remove all tasks | Click the `Clear Tasks` button in the top right                                  |

### Accessibility

`react-beautiful-dnd` comes with built-in [accessibility](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/about/accessibility.md) controls.

| Action            | Keyboard Command |
|-------------------|------------------|
| Move to next item | `Tab`            |
| Select a task     | `Space`          |
| Move the task     | `Arrow` keys     |
| Complete the move | `Space`          |
| Abort the move    | `Esc`            |

## Deployment

Heroku provides a [builpack](https://blog.heroku.com/deploying-react-with-zero-configuration)
for apps bootstrapped with `create-react-app`.

```
heroku create -b https://github.com/mars/create-react-app-buildpack.git
git push heroku master
heroku open
```
