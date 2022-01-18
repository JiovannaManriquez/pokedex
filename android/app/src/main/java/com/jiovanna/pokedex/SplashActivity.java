package com.jiovanna.pokedex;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = new Intent(this, MainActivity.class);
        if(getIntent() != null && getIntent().getExtras() != null){
            intent.putExtras(getIntent().getExtras());
        }
        startActivity(intent);
        finish();
    }
}
