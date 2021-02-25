//https://gist.github.com/jonasgroendahl/efc5c880328860b9550ceab5753a6a55 cameraHUD starts here

//resizable and draggable menus
class Floating {
    /**
    * @param {string} id 
    * id of the dom element
    * @param {number} min_height
    */
    constructor(id, min_height, aspect = 1, save_aspect = true) {
        this.id = id;
        this.floatingBox = document.getElementById(id);
        this.MIN_HEIGHT = min_height;//px
        this.ASPECT = aspect;//width/height
        this.save_aspect = save_aspect;
        this.isResizing = false;
        this.currentResizer = null;
    }
    /**
     * @param {string} top top coordinate with unit prefix (in CSS format)
     * @param {string} left top coordinate with unit prefix (in CSS format)
     */
    show(top, left) {
        this.floatingBox.style.display = "block";

        this.floatingBox.style.top = top;
        this.floatingBox.style.left = left;

        this.floatingBox.style.minHeight = this.MIN_HEIGHT + "px";
        this.floatingBox.style.minWidth = this.MIN_HEIGHT * this.ASPECT + "px";
    }
    hide() {
        this.floatingBox.style.display = "none";
    }
    movable() {
        const self = this;
        self.floatingBox.addEventListener("mousedown", function (event) {
            let prevX = event.clientX,
                prevY = event.clientY;
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup)
            function mousemove(event) {
                if (!self.isResizing) {
                    let diffX = event.clientX - prevX,
                        diffY = event.clientY - prevY;

                    const rect = self.floatingBox.getBoundingClientRect();

                    self.floatingBox.style.left = rect.left + diffX + "px";
                    self.floatingBox.style.top = rect.top + diffY + "px";

                    prevX = event.clientX, prevY = event.clientY;
                }
            }
            function mouseup(event) {
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup);
            }
        })
    }

    resizable() {
        const resizers = document.querySelectorAll("#" + this.id + " > .resizer"), self = this;

        for (let resizer of resizers) {
            resizer.addEventListener("mousedown", mousedown);

            function mousedown(event) {
                self.currentResizer = event.target;
                self.isResizing = true;

                let prevX = event.clientX;
                let prevY = event.clientY;

                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", mouseup);

                function mousemove(event) {
                    const rect = self.floatingBox.getBoundingClientRect();

                    let diffY = event.clientY - prevY;

                    if (self.currentResizer.classList.contains("se")) {
                        let diffX = (self.save_aspect) ? diffY * self.ASPECT : event.clientX - prevX;
                        self.floatingBox.style.width = rect.width + diffX + "px";
                        self.floatingBox.style.height = rect.height + diffY + "px";
                    } else if (self.currentResizer.classList.contains("sw")) {
                        let diffX = (self.save_aspect) ? -diffY * self.ASPECT : event.clientX - prevX;
                        self.floatingBox.style.width = rect.width - diffX + "px";
                        self.floatingBox.style.height = rect.height + diffY + "px";
                        self.floatingBox.style.left = rect.left + diffX + "px";
                    } else if (self.currentResizer.classList.contains("ne")) {
                        let diffX = (self.save_aspect) ? -diffY * self.ASPECT : event.clientX - prevX;
                        self.floatingBox.style.width = rect.width + diffX + "px";
                        self.floatingBox.style.height = rect.height - diffY + "px";
                        self.floatingBox.style.top = rect.top + diffY + "px";
                    } else {
                        let diffX = (self.save_aspect) ? diffY * self.ASPECT : event.clientX - prevX;
                        self.floatingBox.style.width = rect.width - diffX + "px";
                        self.floatingBox.style.height = rect.height - diffY + "px";
                        self.floatingBox.style.top = rect.top + diffY + "px";
                        self.floatingBox.style.left = rect.left + diffX + "px";
                    }

                    prevX = event.clientX;
                    prevY = event.clientY;
                }
                function mouseup() {
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mouseup);
                    self.isResizing = false;
                }
            }

        }
    }

}



