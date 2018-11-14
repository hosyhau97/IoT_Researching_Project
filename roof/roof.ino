int in2 =2;
int in1 = 14;
int check = 0;
void setup()
{
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
}

// open the roof
void openCurtain()
{
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  check =1;
 delay(6400);
}

// close the roof
void closeCurtain()
{
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  delay(6400);
  check =0;
}


// dừng motor
void stopCurtain()
{
  digitalWrite(in1, HIGH);
  digitalWrite(in2, HIGH);

//  delay(2000);
}


void loop()
{
  if (check ==0){
 openCurtain();}
// closeCurtain();
 stopCurtain();   
 if (check ==1){
  closeCurtain();
  }
}
