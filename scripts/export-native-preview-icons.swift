import AppKit
let names = ["clock", "waveform", "person.wave.2", "bubble.left.and.bubble.right", "character.book.closed", "cpu", "command", "gearshape", "info.circle", "sidebar.left", "magnifyingglass", "chevron.left", "chevron.right", "chevron.down", "calendar", "pause.fill", "lock", "arrow.up.left.and.arrow.down.right", "doc.on.clipboard", "play.fill", "speaker.wave.2.fill", "arrow.up.right.square", "folder", "folder.badge.plus", "tray.2", "sun.max", "moon", "desktopcomputer", "square.and.arrow.up", "ellipsis", "person.2", "doc.text", "checkmark", "square.and.pencil", "arrow.uturn.backward", "textformat", "list.bullet", "tablecells", "checklist", "rectangle.on.rectangle", "pencil.tip"]
let destination = URL(fileURLWithPath: CommandLine.arguments[1])
for name in names {
 guard let symbol = NSImage(systemSymbolName: name, accessibilityDescription: nil)?.withSymbolConfiguration(.init(pointSize: 14, weight: .medium)) else { fatalError(name) }
 let size = 64
 let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: size, pixelsHigh: size, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
 let ctx = NSGraphicsContext(bitmapImageRep: rep)!
 NSGraphicsContext.saveGraphicsState(); NSGraphicsContext.current = ctx
 let factor = min(56 / symbol.size.width, 56 / symbol.size.height)
 let rect = NSRect(x: (64-symbol.size.width*factor)/2, y:(64-symbol.size.height*factor)/2, width:symbol.size.width*factor, height:symbol.size.height*factor)
 symbol.draw(in:rect)
 NSGraphicsContext.restoreGraphicsState()
 try rep.representation(using: .png, properties: [:])!.write(to: destination.appendingPathComponent(name + ".png"))
}
print("Exported \(names.count) native symbol masks")
