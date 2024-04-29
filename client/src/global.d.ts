import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types"

declare global {
  interface Window {
    draw?: ExcalidrawImperativeAPI
    EXCALIDRAW_ASSET_PATH?: string
  }
}
