function init() {
  Array.prototype.slice
    .call(document.querySelectorAll('.accordion'))
    .forEach(accordion => {
      const allowMultiple = accordion.hasAttribute('data-allow-multiple');
      const allowToggle =
        allowMultiple || accordion.hasAttribute('data-allow-toggle');
      const animation = accordion.getAttribute('data-animation');

      const triggers = Array.prototype.slice.call(
        accordion.querySelectorAll('.accordion-trigger'),
      );

      triggers.forEach(triggerElement => {
        triggerElement.addEventListener('click', event => {
          const { currentTarget: target } = event;
          const isExpanded = target.getAttribute('aria-expanded') === 'true';
          const activeElement = accordion.querySelector(
            '[aria-expanded="true"]',
          );

          if (!allowMultiple && activeElement && activeElement !== target) {
            activeElement.setAttribute('aria-expanded', 'false');

            document
              .getElementById(activeElement.getAttribute('aria-controls'))
              .setAttribute('hidden', '');

            if (!allowToggle) {
              activeElement.removeAttribute('aria-disabled');
            }
          }

          const panelElement = document.getElementById(
            target.getAttribute('aria-controls'),
          );

          if (!isExpanded) {
            target.setAttribute('aria-expanded', 'true');

            if (animation) {
              if (panelElement.classList.contains(animation)) {
                panelElement.classList.remove(animation);
              }

              panelElement.classList.add('animated', animation);
            }

            panelElement.removeAttribute('hidden');

            if (!allowToggle) {
              target.setAttribute('aria-disabled', 'true');
            }
          } else if (allowToggle && isExpanded) {
            target.setAttribute('aria-expanded', 'false');

            panelElement.setAttribute('hidden', '');
          }

          event.preventDefault();
        });

        triggerElement.addEventListener('keydown', event => {
          const { currentTarget: target } = event;
          const key = event.which.toString();
          const ctrlModifier = event.ctrlKey && key.match(/33|34/); // 33 = Page Up, 34 = Page Down

          // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
          // 38 = Up, 40 = Down
          if (key.match(/38|40/) || ctrlModifier) {
            const index = triggers.indexOf(target);
            const direction = key.match(/34|40/) ? 1 : -1;
            const { length } = triggers;
            const newIndex = (index + length + direction) % length;

            triggers[newIndex].focus();

            event.preventDefault();
          } else if (key.match(/35|36/)) {
            // 35 = End, 36 = Home keyboard operations
            switch (key) {
              case '36': // Go to first accordion
                triggers[0].focus();
                break;
              case '35': // Go to last accordion
                triggers[triggers.length - 1].focus();
                break;
              default:
                break;
            }

            event.preventDefault();
          }
        });

        triggerElement.addEventListener('focus', () => {
          accordion.classList.add('focus');
        });

        triggerElement.addEventListener('blur', () => {
          accordion.classList.remove('focus');
        });
      });

      if (!allowToggle) {
        const expanded = accordion.querySelector('[aria-expanded="true"]');

        if (expanded) {
          expanded.setAttribute('aria-disabled', 'true');
        }
      }
    });
}

export default init;
