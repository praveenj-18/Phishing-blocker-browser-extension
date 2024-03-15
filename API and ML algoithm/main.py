import streamlit as st
from feature import FeatureExtraction
import numpy as np
import pickle as pkl

page_bg_img = '''
<style>
body {
background-image: url("https://images.unsplash.com/photo-1542281286-9e0a16bb7366");
background-size: cover;
}
</style>
'''

st.markdown(page_bg_img, unsafe_allow_html=True)
with open('model.pkl', 'rb') as file:
    temp_model = pkl.load(file)
def main():
    # Set the title and introduction text
    st.title("WEB PHISHING DETECTION")
    st.write("This is a web application to detect phishing attacks.")

    # Add an input box
    url = st.text_input("Enter url:")
    obj = FeatureExtraction(url)
    x = np.array(obj.getFeaturesList()).reshape(1, 30)
    y_pred = temp_model.predict(x)[0]
    if st.button("Submit"):
        # Display the user's input
        if y_pred==1:
            st.write("The provided weburl is Legitimate")
        else:
            st.write("The provided weburl is Illegitimate")

if __name__ == "__main__":
    main()
