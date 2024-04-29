import { ExcalidrawImperativeAPI, LibraryItems } from "@excalidraw/excalidraw/types/types"
import { useCallback } from "react"

import { getLocalStorageJson, setLocalStorageJson } from "../utils"

const _library = "_library"
const _addLibraries = "_addLibraries"

export function saveLibrary(items: LibraryItems) {
  setLocalStorageJson(_library, items)
}

export function loadLibrary(): LibraryItems {
  return getLocalStorageJson(_library, [])
}

/**
 * A react hook which loads libraries from urls supplied via localStorage.
 *
 * @param api api ref to the excalidraw api
 * @returns hook for loading libraries
 */
export function useLoadLibraries(api: ExcalidrawImperativeAPI | undefined) {
  return useCallback(async () => {
    let urls: string[] = getLocalStorageJson(_addLibraries, [])
    if (api) {
      // download all libraries
      const responses = await Promise.all(urls.map((url) => fetch(url)))
      const libraryItemsList = await Promise.all(
        responses.filter((response) => response.ok).map((response) => response.json() as Promise<LibraryItems>)
      )

      // prompt the user for each library
      for (let libraryItems of libraryItemsList) {
        api.updateLibrary({ libraryItems, merge: true })
      }
      setLocalStorageJson(_addLibraries, [])
    }
  }, [api])
}
