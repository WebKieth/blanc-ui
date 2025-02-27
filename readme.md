# Blanc UI

> Fully unstyled :nail_care: lightweight :leaves: user interface environment :hammer_and_wrench:   
:construction: **Progress:** 60% :chart_with_upwards_trend:  
While package is in dev – self-written documentation now available only on russian and partially, sorry :smiling_face_with_tear:

[![npm version](https://img.shields.io/npm/v/blanc-ui.svg?style=flat-square)](https://www.npmjs.com/package/blanc-ui)
[![Build status](https://img.shields.io/github/actions/workflow/status/webkieth/blanc-ui/storybook.yml?branch=main&label=CI&logo=github&style=flat-square)](https://github.com/webkieth/blanc-ui/actions/workflows/storybook.yml)
[![npm downloads](https://img.shields.io/npm/dm/blanc-ui.svg?style=flat-square)](https://npm-stat.com/charts.html?package=blanc-ui)

## Features

- :package: Only small utility client deps - all components are self-written.
- :rainbow: Agnostic restyle ability.
- :relieved: No worries about using modal windows, notifies and z-index dropdown problems - it includes full environment for better render control experience.
- :open_book: No repeatable components. Only basic, with cookbook to create one from another.

## Installation
Bash into root folder of your project:
```bash
npm install blanc-ui@latest
```
Add base styles to your root file:
```main.ts
import 'blanc-ui/react/css'
/** or */
import 'blanc-ui/vue/css'
```
Then initialize plugins or providers you need to use and build your own components.

[Available Writable Documentation](https://webkieth.github.io/blanc-ui_docs/)

## Progress Details

### Vue Ui Kit

[Vue Storybook](https://webkieth.github.io/blanc-ui/vue)

#### Components

| name | status | documentation |
|---|---|---|
| accordion | ready | storybooked |
| button | ready | storybooked |
| button group | ready | storybooked |
| checkbox | ready | storybooked |
| dropdown | ready | storybooked |
| input | ready | storybooked |
| modal | ready | storybooked |
| table | ready | storybooked |
| textarea | ready | storybooked |
| toast | ready | storybooked |
| radio group | ready | storybooked |
| radio | ready | storybooked |
| icon | ready | storybooked |
| calendar | ready | storybooked |
| select | to do | to do |
| spoiler | ready | storybooked |
| datepicker | to do | to do |

#### Plugins
| name | status | documentation |
|---|---|---|
| iconify | ready | to do |
| notify | ready | storybooked |
| eventBus | ready | documenting |
| view-layers | ready | storybooked |

-----------------------------------------

### React Ui Kit

[React Storybook](https://webkieth.github.io/blanc-ui/react)

#### components

| name | status | documentation |
|---|---|---|
| accordion | backlog | backlog |
| button | ready | storybooked |
| button group | ready | storybooked |
| checkbox | ready | storybooked |
| dropdown | backlog | backlog |
| input | ready | storybooked |
| modal | ready | storybooked |
| table | testing | storybooked |
| textarea | to do | to do |
| toast | ready | storybooked |
| radio group | backlog | backlog |
| radio | backlog | backlog |
| select | backlog | backlog |
| spoiler | backlog | backlog |
| icon | ready | storybooked |
| calendar | backlog | backlog |
| datepicker | backlog | backlog |

#### providers
| name | status | documentation |
|---|---|---|
| iconify | ready | to do |
| eventBus | backlog | backlog |
| notify | ready | storybooked |
| view-layers | ready | storybooked |