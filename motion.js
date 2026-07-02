(function () {
    if (window.gsap) {
        return;
    }

    function getTargets(targets) {
        if (typeof targets === "string") {
            return Array.from(document.querySelectorAll(targets));
        }

        if (targets instanceof Element || targets === document.body) {
            return [targets];
        }

        return Array.from(targets || []);
    }

    function buildTransform(vars) {
        const transforms = [];

        if (vars.x !== undefined || vars.y !== undefined) {
            transforms.push("translate(" + (vars.x || 0) + "px, " + (vars.y || 0) + "px)");
        }

        if (vars.scale !== undefined) {
            transforms.push("scale(" + vars.scale + ")");
        }

        if (vars.rotation !== undefined) {
            transforms.push("rotate(" + vars.rotation + "deg)");
        }

        return transforms.join(" ");
    }

    function animate(targets, vars, isFrom) {
        const elements = getTargets(targets);
        const duration = Math.max(0, vars.duration || 0) * 1000;
        const delay = Math.max(0, vars.delay || 0) * 1000;
        const repeat = vars.repeat || 0;
        const shouldYoyo = Boolean(vars.yoyo && repeat);

        elements.forEach(function (element) {
            const transition = "all " + duration + "ms ease";

            if (isFrom) {
                if (vars.opacity !== undefined) {
                    element.style.opacity = vars.opacity;
                }
                const fromTransform = buildTransform(vars);
                if (fromTransform) {
                    element.style.transform = fromTransform;
                }
                element.getBoundingClientRect();
                element.style.transition = transition;
                requestAnimationFrame(function () {
                    element.style.opacity = "1";
                    element.style.transform = "";
                });
                return;
            }

            window.setTimeout(function () {
                element.style.transition = transition;
                if (vars.opacity !== undefined) {
                    element.style.opacity = vars.opacity;
                }
                const transform = buildTransform(vars);
                if (transform) {
                    element.style.transform = transform;
                }

                if (shouldYoyo) {
                    window.setTimeout(function () {
                        element.style.transform = "";
                    }, duration);
                }
            }, delay);
        });

        const totalDuration = delay + duration * (shouldYoyo ? repeat + 1 : 1);
        if (typeof vars.onComplete === "function") {
            window.setTimeout(vars.onComplete, totalDuration);
        }
    }

    window.gsap = {
        to: function (targets, vars) {
            animate(targets, vars || {}, false);
        },
        from: function (targets, vars) {
            animate(targets, vars || {}, true);
        }
    };
})();
