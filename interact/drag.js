export function draggable($elem, $handle) {
    // Visuals
    function onHover() {
        $("body").css("cursor", "grab");
    }
    function offHover() {
        $("body").css("cursor", "auto");
    }

    // Movement
    function onDrag(event) {
        const start = [event.pageX, event.pageY];
        const startElement = [$elem.offset().left, $elem.offset().top];

        function onMove(event) {
            $elem.offset({
                left: startElement[0] + (event.pageX - start[0]),
                top: startElement[1] + (event.pageY - start[1])
            });
        }

        $(document).on("mousemove", onMove);
        $(document).one("mouseup", function() {
            $(document).off("mousemove", onMove);
        });
    }

    // Add it.
    $handle.on("mouseenter", onHover);
    $handle.on("mouseleave", offHover);
    $handle.on("mousedown", onDrag);

    // Remove it.
    function detach() {
        $handle.off("mouseenter", onHover);
        $handle.off("mouseleave", offHover);
        $handle.off("mousedown", onDrag);
    }

    return {
        element: $elem,
        handle: $handle,
        detach: detach
    }
}