enum Status {
    Published = 'published',
    Draft = 'draft',
    Deleted = 'deleted'
}

async function getFaqs(request: {
    topicId: number,
    status: Status
}): Promise<{
    question: string,
    answer: string,
    tags: string[],
    likes: number,
    status: Status
}[]> {
    const result = await fetch('/faqs', {
        method: 'POST',
        body: JSON.stringify(request)
    });
    const data = await result.json();
    return data;
}

let asdf: string = '\
/* Запрос */\
{\
	"topicId": 5,\
	"status": "published" // "draft", "deleted"\
}\
/* Ответ */\
[\
	{\
		"question": "Как осуществляется доставка?",\
		"answer": "быстро!",\
		"tags": [\
			"popular",\
			"new"\
		],\
		"likes": 3,\
		"status": "published"\
	}\
]';