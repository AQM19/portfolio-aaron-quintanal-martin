import { useTranslations } from 'next-intl';
import { useUIDarkMode } from '@/core/services/ui/dark-mode.service'
import { useUISidebarStatus } from '@/core/services/ui/sidebar-status.service'

export const HeaderComponent = () => {

    const openSideMenu = useUISidebarStatus(state => state.openSideMenu);
    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);
    const enableDarkMode = useUIDarkMode(mode => mode.enableDarkMode);
    const disableDarkMode = useUIDarkMode(mode => mode.disableDarkMode);

    const toggleDarkMode = () => {
        isDarkModeEnabled ? disableDarkMode() : enableDarkMode();
    }
    const t = useTranslations("Menu");

    return (
        <header>
            
        </header>
    )
}
