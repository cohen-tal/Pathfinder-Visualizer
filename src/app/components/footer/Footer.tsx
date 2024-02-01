import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <div className="absolute bottom-2 w-full flex flex-row items-center justify-center gap-2  border-slate-900/10 dark:border-slate-300/10 dark:bg-slate-700 border-t">
        <p className="font-semibold text-sm p-1">Made with ❤️ by Tal Cohen</p>
        <>
        <a className="pl-2" href='https://github.com/cohen-tal' target="_blank"><GitHubIcon sx={{fontSize:"2rem"}} /></a>
        <a className="pl-2" href='https://www.linkedin.com/in/tal-cohen-89ba68210/' target="_blank"><LinkedInIcon fontSize="large" /></a>
        </>
    </div>
  )
}