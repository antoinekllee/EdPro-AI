import openai
import os

def generate():
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": f"Please generate 10 questions."},
            {"role": "assistant", "content": "QUESTIONS HERE"},
            {"role": "user", "content": f"Please generate 10 questions."},
        ], 
        temperature=0.7,
        max_tokens=1000
    )
    print ("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + str(response['usage']['total_tokens']) + " TOKENS USED\n")
    return response['choices'][0]['message']['content']

if __name__ == '__main__':
    openai.api_key = os.getenv("OPENAI_API_KEY")
    response = generate()
    print (response)