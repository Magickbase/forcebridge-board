import { IconCalendarStats } from "@tabler/icons-react"
import { FloatingDock } from "./ui/floating-dock"

export const links = [{
  title: 'Timeline',
  href: '/',
  icon: <IconCalendarStats className="h-full w-full text-neutral-500 dark:text-neutral-300" />
},
{
  title: 'Force Bridge',
  href: '/force-bridge',
  icon: <img src="https://forcebridge.com/favicon.ico" alt="Force Bridge" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
},
{
  title: 'Godwoken v1',
  href: '/godwoken-v1',
  icon: <img src="https://godwoken.com/images/footer-logo.png" alt="Godwoken v1" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
},

{
  title: 'Godwoken v0',
  href: '/godwoken-v0',
  icon: <img src="https://godwoken.com/images/footer-logo.png" alt="Godwoken v2" className="h-full w-full text-neutral-500 dark:text-neutral-300" style={{
    filter: 'grayscale(100%) brightness(0.5)',
  }} />
}
]

const Nav = () => {

  return <FloatingDock desktopClassName="fixed bottom-10 right-10" mobileClassName="fixed bottom-10 right-10" items={links} />

}

export default Nav
