import { cn } from '@algoroot/ui/lib/utils'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

export const proseStyles = cn(
	'prose dark:prose-invert',
	'prose-h1:text-3xl prose-headings:text-foreground',
	'prose-h2:text-2xl',
	'prose-h3:text-xl',
	'prose-h4:text-lg',
	'prose-strong:text-accent-foreground prose-strong:font-bold',
	'prose-li:marker:size-4 prose-li:marker:text-foreground',
	'prose-pre:bg-muted prose-pre:text-foreground prose-pre:rounded-md prose-pre:p-4 prose-pre:text-sm prose-pre:w-full! prose-pre:max-w-full prose-pre:overflow-x-auto! prose-pre:inline-grid',
	'prose-code:bg-muted prose-code:text-accent-foreground prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-sm',
)
export const Markdown = ({ children }: { children: string }) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				code({ node, inline, className, children, ...props }: any) {
					const match = /language-(\w+)/.exec(className || '')

					return !inline && match ?
							<SyntaxHighlighter
								style={dracula}
								PreTag="div"
								language={match[1]}
								codeTagProps={{
									style: { fontFamily: 'inherit' },
								}}
								{...props}
							>
								{String(children).replace(/\n$/, '')}
							</SyntaxHighlighter>
						:	<code className={className} {...props}>
								{children}
							</code>
				},
				a({ href, children, ...props }) {
					return (
						<a
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:text-primary/80"
							{...props}
						>
							{children}
						</a>
					)
				},
			}}
		>
			{children}
		</ReactMarkdown>
	)
}
