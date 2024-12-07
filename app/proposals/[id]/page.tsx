'use client';

import { BoxABI } from '@/common/abis/Box';
import { BoxAddress } from '@/common/contracts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useReadContract } from 'wagmi';

const tasks = [
	{
		title: 'Develop Smart Contract',
		description: 'Create and test the main smart contract',
		status: 'Completed' as const,
		dueDate: '2023-10-01',
		assignee: 'Alice',
	},
	{
		title: 'Frontend Integration',
		description: 'Integrate the smart contract with the frontend',
		status: 'In Progress' as const,
		dueDate: '2023-10-05',
		assignee: 'Bob',
	},
	{
		title: 'Security Audit',
		description: 'Conduct a security audit of the smart contract',
		status: 'Todo' as const,
		dueDate: '2023-10-10',
		assignee: 'Charlie',
	},
	{
		title: 'Documentation',
		description: 'Write comprehensive documentation for the project',
		status: 'Todo' as const,
		dueDate: '2023-10-15',
		assignee: 'Dave',
	},
	{
		title: 'User Testing',
		description: 'Conduct user testing and gather feedback',
		status: 'Todo' as const,
		dueDate: '2023-10-20',
		assignee: 'Eve',
	},
	{
		title: 'Deploy to Testnet',
		description: 'Deploy the smart contract to a testnet for further testing',
		status: 'Todo' as const,
		dueDate: '2023-10-25',
		assignee: 'Frank',
	},
];

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);

	const a = useReadContract({
		abi: BoxABI,
		address: BoxAddress,
		functionName: '',
	});

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		// Handle form submission logic here
		// const d = {
		//   boxAddress: ["0xe6Eaa8890c58AD9DEd5a419De8E4C07eD7e9eF3F"],
		//   value: [0],
		//   []
		// };



		console.log('Proposal submitted');
		setIsOpen(false);
	};
	return (
		<div className="container mx-auto py-6 mt-20">
			<h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
				<div className="md:col-span-2">
					<Card className="h-full">
						<CardHeader>
							<CardTitle>Company Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex justify-center">
								<img
									alt="Company Logo"
									className="h-20 w-20"
									src="/placeholder.svg?height=80&width=80"
								/>
							</div>
							<div className="space-y-2">
								<Label>Wallet Address</Label>
								<p className="text-sm text-muted-foreground break-all">
									0x1234567890123456789012345678901234567890
								</p>
							</div>
							<div className="space-y-2">
								<Label>Contract Address</Label>
								<p className="text-sm text-muted-foreground break-all">
									0x0987654321098765432109876543210987654321
								</p>
							</div>
							<div className="space-y-2">
								<Label>Description</Label>
								<p className="text-sm text-muted-foreground">
									Our company specializes in blockchain solutions and
									decentralized applications.
								</p>
							</div>
							<div className="space-y-2">
								<Label>Description</Label>
								<button className="text-sm text-muted-foreground">
									propose
								</button>
							</div>
						</CardContent>
					</Card>
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DialogTrigger asChild>
							<Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
								<Send className="w-4 h-4 mr-2" />
								Submit Proposal
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Submit Proposal</DialogTitle>
							</DialogHeader>
							<form onSubmit={handleSubmit} className="space-y-4">
								{/* <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter proposal title" required />
            </div> */}
								<div className="space-y-2 flex flex-col">
									<Label htmlFor="description">Description</Label>
									<textarea
										id="description"
										placeholder="Enter proposal description"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="other">Value</Label>
									<Input id="other" placeholder="Counter value" />
								</div>
								<Button
									type="submit"
									className="w-full bg-orange-500 hover:bg-orange-600 text-white"
								>
									Submit
								</Button>
							</form>
						</DialogContent>
					</Dialog>
				</div>
				<div className="md:col-span-3">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">Tasks</h2>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{tasks.map((task, index) => (
								<TaskCard key={index} {...task} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

interface ProposalCardProps {
	name: string;
	proposalCount: number;
	imageUrl?: string;
	id: number;
}

export function ProposalCard({
	name,
	id,
	proposalCount,
	imageUrl = 'https://kzmjkn9141ba7eq0cqq8.lite.vusercontent.net/placeholder.svg?height=200&width=200',
}: ProposalCardProps) {
	return (
		<Link href={`/proposals/${id}`}>
			<Card className="w-[250px] overflow-hidden border-2">
				<div className="aspect-square w-full relative">
					<img
						src={imageUrl}
						alt={`${name}'s proposal card`}
						className="object-cover w-full h-full"
					/>
				</div>
				<CardContent className="p-4">
					<h3 className="text-2xl font-bold tracking-wide">{name}</h3>
					<p className="text-sm text-muted-foreground">
						{proposalCount} proposals
					</p>
				</CardContent>
			</Card>
		</Link>
	);
}

interface TaskCardProps {
	title: string;
	description: string;
	status: 'Todo' | 'In Progress' | 'Completed';
	dueDate: string;
	assignee: string;
}

export function TaskCard({
	title,
	description,
	status,
	dueDate,
	assignee,
}: TaskCardProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// const statusColor = {
	//   Todo: "bg-yellow-500",
	//   "In Progress": "bg-blue-500",
	//   Completed: "bg-green-500",
	// }[status];

	return (
		<>
			<Card
				className="cursor-pointer hover:shadow-md transition-shadow"
				onClick={() => setIsModalOpen(true)}
			>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">{title}</CardTitle>
					{/* <Badge className={statusColor}>
            </Badge> */}
					{status}
				</CardHeader>
				<CardContent>
					<p className="text-xs text-muted-foreground">{description}</p>
				</CardContent>
			</Card>
			<TaskModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={title}
				description={description}
				status={status}
				dueDate={dueDate}
				assignee={assignee}
			/>
		</>
	);
}

interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description: string;
	status: 'Todo' | 'In Progress' | 'Completed';
	dueDate: string;
	assignee: string;
}

export function TaskModal({
	isOpen,
	onClose,
	title,
	description,
	status,
	dueDate,
	assignee,
}: TaskModalProps) {
	// const statusColor = {
	// 	Todo: 'bg-yellow-500',
	// 	'In Progress': 'bg-blue-500',
	// 	Completed: 'bg-green-500',
	// }[status];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{status}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<span className="font-medium">Description:</span>
						<p className="col-span-3">{description}</p>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<span className="font-medium">Due Date:</span>
						<span className="col-span-3">{dueDate}</span>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<span className="font-medium">Assignee:</span>
						<span className="col-span-3">{assignee}</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
