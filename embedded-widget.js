// Add event listener for validation message from the main script
window.addEventListener('message', function (event) {
    if (event.data.appDomain) {
      validateDomain(event, event.data.appDomain, event.origin);
    }
  }, false);
  
  function validateDomain(event, appDomain, eventOrigin) {
    const isValid = (eventOrigin === appDomain);
  
    // Send validation result back to the host application
    event.source.postMessage({ validationResult: isValid }, eventOrigin);
  }

const nShiftApps = {};
nShiftApps.trackWidget = function (config) {
    const defaultOptions = {
        // Default nshift options for the widget
        textColor: 'black',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        svgColor: 'blue',
        fontSize: '16px',
    };

    const options = { ...defaultOptions, ...config.options };

    function adjustStyling(widgetCard) {
        // Style card elements based on options
        widgetCard.style.padding = '50px';
        widgetCard.style.textAlign = 'center';
        widgetCard.style.backgroundColor = options.backgroundColor;
        widgetCard.style.fontFamily = options.fontFamily;
        widgetCard.style.fontSize = options.fontSize;
        widgetCard.style.color = options.textColor;
    }

    function displayWidgetData(widgetCard) {
        // Create SVG element
        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.setAttribute('width', '100');
        svgIcon.setAttribute('height', '100');
        svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgIcon.setAttribute('viewBox', '0 0 24 24');

        // Create SVG content (replace this with your SVG icon content)
        const svgContent = `
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 18H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V8h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2z"/>
        `;

        // Apply provided SVG color or default color
        const svgColor = options.svgColor || 'blue';
        svgIcon.innerHTML = svgContent.replace('fill="none"', `fill="${svgColor}"`);

        // Append SVG icon to the card content
        widgetCard.appendChild(svgIcon);
    }

    const hostContainer = document.getElementById(config.containerId);
    if (hostContainer) {
        // Create HTML for the widget card
        const widgetHTML = `
      <div class="widget-card">
        <div class="widget-content" style="margin-bottom:20px;font-weight:bold;">
          Widget Content
        </div>
      </div>
    `;

        // Create a temporary div to hold the HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = widgetHTML;

        // Get the widget card from the HTML content
        const widgetCard = tempDiv.querySelector('.widget-card');

        if (widgetCard) {
            // Adjust styling for the widget card
            adjustStyling(widgetCard);

            // Append the widget card to the host container
            hostContainer.appendChild(widgetCard);

            // Display widget data within the widget card
            displayWidgetData(widgetCard);
        }
    }
};

