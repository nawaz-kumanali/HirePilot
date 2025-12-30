import { useAppSelector } from "../store/hooks"
import { userMenuActions } from "../store/UserMenu/usermenu.slice";

export function getUserMenuState() {
    const isUserMenuOpen = useAppSelector(state => state.userMenu.isUserMenuOpen);
    return isUserMenuOpen
}

