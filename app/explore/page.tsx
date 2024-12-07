'use client';

import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
	const proposals = Array.from({ length: 20 }, (_, index) => ({
		name: `Naam ${index + 1}`,
		proposalCount: 91,
		id: index + 1,
	}));

	return (
		<div>
			{/* <div className="fixed top-0 right-0 z-10 w-screen">
				<Navbar />
			</div> */}
			<div className="p-4 mt-20 grid grid-cols-5 gap-4">
				{proposals.map((proposal, index) => (
					<ProposalCard
						key={index}
						name={proposal.name}
						proposalCount={proposal.proposalCount}
						id={proposal.id}
					/>
				))}
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
