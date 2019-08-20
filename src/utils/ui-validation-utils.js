import log from '../log';

/**
 * Utils that checks environment for compatibility with assistant
 * @param settings
 * @returns {{
 * checkVisibleAreaSize: checkVisibleAreaSize,
 * validateBrowser: validateBrowser,
 * validatePage: validatePage,
 * getViewPort: getViewPort
 * }}
 * @constructor
 */
export default function UIValidationUtils(settings) {
    const { document } = window;

    const getViewPort = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        return { width, height };
    };

    /**
     * Check if visible area are enough to show menu.
     * @returns boolean. True if area enough
     */
    const checkVisibleAreaSize = () => {
        const viewPort = getViewPort();
        // eslint-disable-next-line max-len
        const visibleAreaSize = viewPort.height > settings.Constants.MINIMUM_VISIBLE_HEIGHT_TO_SHOW_BUTTON;

        if (!visibleAreaSize) {
            log.error(`Viewport height is too small: ${viewPort.height}`);
        }

        return visibleAreaSize;
    };

    /**
     * Checks if browser is valid for Adguard assistant
     * @returns boolean. True if browser valid
     */
    const validateBrowser = () => {
        const valid = !document.documentMode
            || (document.documentMode > settings.Constants.MINIMUM_IE_SUPPORTED_VERSION);

        if (!valid) {
            log.error(`IE version is ${document.documentMode}`);
        }

        return valid;
    };

    /**
     * Checks if page is valid for Adguard assistant to work here.
     */
    const validatePage = () => {
        // Assistant do not work in iframes
        if (window.window !== window.top) {
            log.error(`Page is iframe: ${window.location.href}`);
            return false;
        }
        return true;
    };

    return {
        checkVisibleAreaSize,
        validateBrowser,
        validatePage,
        getViewPort,
    };
}
