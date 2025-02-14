"use client"

import React, { useState } from 'react';
import { Star, ThumbsUp, MoreVertical, MessageCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image';

const dummyReviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      image: "/avatars/sarah.jpg",
      role: "Verified Buyer"
    },
    rating: 5,
    title: "Exceptional Quality and Service",
    comment: "The product exceeded my expectations in every way. The attention to detail and customer service were outstanding.",
    date: "2024-02-10",
    likes: 24,
    replies: 3,
    images: ["/api/placeholder/200/150", "/api/placeholder/200/150"]
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      image: "/avatars/michael.jpg",
      role: "Verified Buyer"
    },
    rating: 4,
    title: "Great Product, Minor Issues",
    comment: "Overall very satisfied with the purchase. There were some small issues with delivery but customer service handled it well.",
    date: "2024-02-09",
    likes: 15,
    replies: 2
  },
  {
    id: 3,
    user: {
      name: "Emma Williams",
      image: "/avatars/emma.jpg",
      role: "Verified Buyer"
    },
    rating: 5,
    title: "Absolutely Love It!",
    comment: "This has been one of my best purchases this year. The quality is outstanding and it arrived earlier than expected.",
    date: "2024-02-08",
    likes: 32,
    replies: 5,
    images: ["/api/placeholder/200/150"]
  }
];

const ReviewsDashboard = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const averageRating = 4.7;
  const totalReviews = 152;
  const ratingDistribution = [
    { stars: 5, count: 98, percentage: 64 },
    { stars: 4, count: 35, percentage: 23 },
    { stars: 3, count: 12, percentage: 8 },
    { stars: 2, count: 5, percentage: 3 },
    { stars: 1, count: 2, percentage: 2 }
  ];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Overview Card */}
        <Card className="bg-black/95 border border-[#098135]/30">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Rating Summary */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-white">{averageRating}</span>
                  <div>
                    <div className="flex text-[#098135]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill={i < Math.floor(averageRating) ? "#098135" : "none"} className="w-5 h-5" />
                      ))}
                    </div>
                    <p className="text-gray-400">{totalReviews} reviews</p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {ratingDistribution.map(({ stars, count, percentage }) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-gray-400 w-8">{stars}★</span>
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#098135] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-gray-400 w-12">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters and Stats */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-black border-[#098135]/30 text-white">
                      <SelectValue placeholder="Filter reviews" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#098135]/30">
                      <SelectItem value="all" className="text-white">All Reviews</SelectItem>
                      <SelectItem value="positive" className="text-white">Positive Only</SelectItem>
                      <SelectItem value="negative" className="text-white">Critical</SelectItem>
                      <SelectItem value="images" className="text-white">With Images</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-black border-[#098135]/30 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#098135]/30">
                      <SelectItem value="recent" className="text-white">Most Recent</SelectItem>
                      <SelectItem value="helpful" className="text-white">Most Helpful</SelectItem>
                      <SelectItem value="rating" className="text-white">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {dummyReviews.map((review) => (
            <Card key={review.id} className="bg-black/95 border border-[#098135]/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.user.image} />
                        <AvatarFallback className="bg-[#098135]/20 text-white">
                          {review.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-white">{review.user.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex text-[#098135]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                fill={i < review.rating ? "#098135" : "none"}
                                className="w-4 h-4"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">{review.user.role}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Review Content */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-white">{review.title}</h4>
                    <p className="text-gray-300">{review.comment}</p>

                    {/* Review Images */}
                    {review.images && (
                      <div className="flex gap-2 mt-4">
                        {review.images.map((image, index) => (
                          <Image
                            height={100}
                            width={100}
                            key={index}
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="rounded-lg w-24 h-24 object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Review Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#098135]/20">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-gray-400 hover:text-[#098135]">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-[#098135]">
                        <MessageCircle className="w-4 h-4" />
                        <span>{review.replies}</span>
                      </button>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsDashboard;