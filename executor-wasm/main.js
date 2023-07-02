// -*- coding: utf-8, vim: expandtab:ts=4 -*-

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


const moduleGame = import('./pkg/executor_wasm.js').then(({ default: init, main }) =>
  init().then(() => main)
)
const elementTargetButton = document.querySelector('#button-start')
const elementMain = document.querySelector('#main')

const run = async () => {
  elementTargetButton.removeEventListener('click', run)
  elementMain.remove()

  const context = new AudioContext()

  if (context.state !== 'running') {
    await context.resume()
  }

  return (await moduleGame)()
}

elementTargetButton.addEventListener('click', run, {
  once: true,
  passive: true,
})
